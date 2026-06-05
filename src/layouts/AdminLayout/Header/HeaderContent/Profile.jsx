'use client';

import { Fragment, useMemo, useRef, useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

// @third-party
import { AnimatePresence, motion } from 'motion/react';

// @project
import { ThemeDirection, ThemeI18n } from '@/config';
import MainCard from '@/components/MainCard';
import Profile from '@/components/Profile';
import { varSlide } from '@/components/third-party/motion/animate/dialog';
import { AvatarSize, ChipIconPosition } from '@/enum';
import useConfig from '@/hooks/useConfig';
import useCurrentUser from '@/hooks/useCurrentUser';
import { logout } from '@/utils/api/auth';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

// @assets
import { IconChevronRight, IconLanguage, IconLogout, IconPhoto, IconTextDirectionLtr, IconUser } from '@tabler/icons-react';

const languageList = [
  { key: ThemeI18n.EN, value: 'English' },
  { key: ThemeI18n.FR, value: 'French' },
  { key: ThemeI18n.RO, value: 'Romanian' },
  { key: ThemeI18n.ZH, value: 'Chinese' }
];

/***************************  HEADER - PROFILE  ***************************/

export default function ProfileSection() {
  const theme = useTheme();
  const tooltipShadow = theme?.vars?.customShadows?.tooltip || theme?.customShadows?.tooltip || theme?.shadows?.[1];
  const {
    state: { i18n, themeDirection },
    setField
  } = useConfig();
  const { userData } = useCurrentUser();
  const { refreshUser } = useAuth();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const [innerAnchorEl, setInnerAnchorEl] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const open = Boolean(anchorEl);
  const innerOpen = Boolean(innerAnchorEl);
  const id = open ? 'profile-action-popper' : undefined;
  const innerId = innerOpen ? 'profile-inner-popper' : undefined;
  const buttonStyle = { borderRadius: 2, p: 1 };

  const displayName = useMemo(() => {
    const fullName =
      userData?.nombre_completo ||
      userData?.full_name ||
      userData?.user_metadata?.full_name ||
      userData?.user_metadata?.nombre_completo ||
      `${userData?.firstname ?? ''} ${userData?.lastname ?? ''}`.trim();

    return fullName || userData?.email || 'Usuario';
  }, [userData]);

  const initials = useMemo(() => {
    const parts = String(displayName)
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const first = parts[0]?.[0] || 'U';
    const last = parts[1]?.[0] || parts[0]?.[1] || '';
    return `${first}${last}`.toUpperCase();
  }, [displayName]);

  const avatarSrc = useMemo(() => {
    return (
      userData?.avatar_url ||
      userData?.user_metadata?.avatar_url ||
      userData?.user_metadata?.picture ||
      userData?.user_metadata?.photoURL ||
      userData?.user_metadata?.avatar ||
      null
    );
  }, [userData]);

  const roleLabel = useMemo(() => {
    const role = userData?.role;
    if (!role) return '';
    const map = {
      admin: 'Administrador',
      analista: 'Analista',
      cliente: 'Cliente',
      notario: 'Notario'
    };
    return map[role] || String(role);
  }, [userData]);

  const profileData = useMemo(() => {
    return {
      avatar: { src: avatarSrc || undefined, size: AvatarSize.XS, children: initials },
      title: displayName,
      caption: roleLabel
    };
  }, [avatarSrc, displayName, initials, roleLabel]);

  const handleActionClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleInnerActionClick = (event) => {
    setInnerAnchorEl(innerAnchorEl ? null : event.currentTarget);
  };

  const logoutAccount = () => {
    setAnchorEl(null);
    logout();
  };

  const goToProfile = () => {
    setAnchorEl(null);
    router.push('/dashboard/profile');
  };

  const triggerUpload = () => {
    setUploadError('');
    setUploadSuccess(false);
    fileInputRef.current?.click();
  };

  const onAvatarFileSelected = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setUploadError('');
    setUploadSuccess(false);
    setUploading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      if (!supabase || !userData?.id) {
        setUploadError('No se pudo inicializar el cliente de autenticación.');
        return;
      }

      const bucket = 'avatars';
      const fileExt = file.name.split('.').pop();
      const filePath = `avatars/${userData.id}/${Date.now()}_${Math.floor(Math.random() * 10000)}.${fileExt}`;

      const ensureResp = await fetch('/api/storage/ensure-bucket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bucket, public: true })
      });
      if (!ensureResp.ok) {
        const ensureBody = await ensureResp.json().catch(() => ({}));
        setUploadError(ensureBody?.error || 'No se pudo preparar el storage para la foto.');
        return;
      }

      const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file, { upsert: true });
      if (uploadError) {
        setUploadError(uploadError.message);
        return;
      }

      const {
        data: { publicUrl }
      } = supabase.storage.from(bucket).getPublicUrl(filePath);

      if (publicUrl) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
          .eq('id', userData.id);

        if (profileError && !String(profileError.message || '').toLowerCase().includes('avatar_url')) {
          setUploadError(profileError.message);
          return;
        }

        const { error: authError } = await supabase.auth.updateUser({ data: { avatar_url: publicUrl, picture: publicUrl } });
        if (authError) {
          setUploadError(authError.message);
          return;
        }

        await refreshUser();
        setUploadSuccess(true);
      }
    } catch (err) {
      setUploadError(err?.message || 'No se pudo subir la foto.');
    } finally {
      setUploading(false);
    }
  };

  const i18nHandler = (event, key) => {
    handleInnerActionClick(event);
    if (key != i18n) setField('i18n', key);
  };

  return (
    <>
      <Box onClick={handleActionClick} sx={{ cursor: 'pointer' }}>
        <Avatar src={avatarSrc || undefined} alt={displayName} sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
          {initials}
        </Avatar>
      </Box>
      <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png" hidden onChange={onAvatarFileSelected} />
      <AnimatePresence>
        <Fragment>
          <Popper
            placement="bottom-end"
            id={id}
            open={open}
            anchorEl={anchorEl}
            transition
            popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [theme.direction === ThemeDirection.RTL ? -8 : 8, 8] } }] }}
          >
            {({ TransitionProps }) => (
              <Fade in={open} {...TransitionProps}>
                <motion.div variants={varSlide('slideInDown', { distance: 10 })} initial="initial" animate="animate" exit="exit">
                  <MainCard sx={{ borderRadius: 2, boxShadow: tooltipShadow, minWidth: 220, p: 0.5 }}>
                    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                      <Stack sx={{ px: 0.5, py: 0.75 }}>
                        <Profile
                          {...profileData}
                          placeholderIfEmpty
                          sx={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: 1,
                            '& .MuiAvatar-root': { width: 48, height: 48 }
                          }}
                        />
                        {uploadSuccess && (
                          <Alert severity="success" sx={{ mt: 1 }}>
                            Foto actualizada
                          </Alert>
                        )}
                        {uploadError && (
                          <Alert severity="error" sx={{ mt: 1 }}>
                            {uploadError}
                          </Alert>
                        )}
                        <Divider sx={{ my: 1 }} />
                        <List disablePadding>
                          <ListItemButton sx={buttonStyle} onClick={goToProfile}>
                            <ListItemIcon>
                              <IconUser size={16} />
                            </ListItemIcon>
                            <ListItemText primary="Mi Perfil" />
                          </ListItemButton>
                          <ListItemButton sx={buttonStyle} onClick={triggerUpload} disabled={uploading}>
                            <ListItemIcon>
                              <IconPhoto size={16} />
                            </ListItemIcon>
                            <ListItemText primary={uploading ? 'Subiendo foto...' : 'Cambiar foto'} />
                          </ListItemButton>
                          <ListItem
                            secondaryAction={
                              <Switch
                                size="small"
                                checked={theme.direction === ThemeDirection.RTL}
                                onChange={() =>
                                  setField(
                                    'themeDirection',
                                    themeDirection === ThemeDirection.RTL ? ThemeDirection.LTR : ThemeDirection.RTL
                                  )
                                }
                              />
                            }
                            sx={{ py: 1, pl: 1, '& .MuiListItemSecondaryAction-root': { right: 8 } }}
                          >
                            <ListItemIcon>
                              <IconTextDirectionLtr size={16} />
                            </ListItemIcon>
                            <ListItemText primary="RTL" />
                          </ListItem>
                          <ListItemButton sx={buttonStyle} onClick={handleInnerActionClick}>
                            <ListItemIcon>
                              <IconLanguage size={16} />
                            </ListItemIcon>
                            <ListItemText primary="Language" />
                            <Chip
                              label={languageList.filter((item) => item.key === i18n)[0]?.value.slice(0, 3)}
                              variant="text"
                              size="small"
                              color="secondary"
                              icon={<IconChevronRight size={16} />}
                              position={ChipIconPosition.RIGHT}
                              sx={{ textTransform: 'capitalize' }}
                            />
                            <AnimatePresence>
                              <Fragment>
                                <Popper
                                  placement="left-start"
                                  id={innerId}
                                  open={innerOpen}
                                  anchorEl={innerAnchorEl}
                                  transition
                                  popperOptions={{
                                    modifiers: [
                                      {
                                        name: 'preventOverflow',
                                        options: {
                                          boundary: 'clippingParents'
                                        }
                                      },
                                      { name: 'offset', options: { offset: [0, 8] } }
                                    ]
                                  }}
                                >
                                  {({ TransitionProps }) => (
                                    <Fade in={innerOpen} {...TransitionProps}>
                                      <motion.div
                                        variants={varSlide('slideInLeft', { distance: 10 })}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                      >
                                        <MainCard
                                          sx={{ borderRadius: 2, boxShadow: tooltipShadow, minWidth: 150, p: 0.5 }}
                                        >
                                          <ClickAwayListener onClickAway={() => setInnerAnchorEl(null)}>
                                            <List disablePadding>
                                              {languageList.map((item, index) => (
                                                <ListItemButton
                                                  selected={item.key === i18n}
                                                  key={index}
                                                  sx={buttonStyle}
                                                  onClick={(event) => i18nHandler(event, item.key)}
                                                >
                                                  <ListItemText>{item.value}</ListItemText>
                                                </ListItemButton>
                                              ))}
                                            </List>
                                          </ClickAwayListener>
                                        </MainCard>
                                      </motion.div>
                                    </Fade>
                                  )}
                                </Popper>
              </Fragment>
            </AnimatePresence>
                          </ListItemButton>
                          <ListItem disablePadding>
                            <Button
                              fullWidth
                              variant="outlined"
                              color="secondary"
                              size="small"
                              endIcon={<IconLogout size={16} />}
                              onClick={logoutAccount}
                            >
                              Logout
                            </Button>
                          </ListItem>
                        </List>
                      </Stack>
                    </ClickAwayListener>
                  </MainCard>
                </motion.div>
              </Fade>
            )}
          </Popper>
        </Fragment>
      </AnimatePresence>
    </>
  );
}
