'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

// @project
import SvgIcon from '@/components/SvgIcon';
import { IconType } from '@/enum';
import { withAlpha } from '@/utils/colorUtils';

/***************************  MEGA MENU - 3  ***************************/

/**
 *
 * Demos:
 * - [MegaMenu3](https://www.Capitalta.io/blocks/megamenu/megamenu3)
 *
 * API
 * - [MegaMenu3 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/megamenu/megamenu3#props-details)
 */

export default function MegaMenu3({ menuItems, footerData, popperWidth = 725, footerSX }) {
  const theme = useTheme();
  return (
    <>
      <List
        component="nav"
        sx={{ p: 1, width: '100%', maxWidth: { xs: 1, md: popperWidth }, bgcolor: 'background.paper', display: 'flex', flexWrap: 'wrap' }}
      >
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              px: { xs: 1.5, md: 2 },
              py: { xs: 0.75, md: 1.25 },
              my: 0.25,
              mx: 0.25,
              width: { xs: 1, sm: '49%' },
              borderRadius: 3,
              '&:hover': { bgcolor: 'grey.50' },
              '&:focus-visible': { bgcolor: 'grey.200' }
            }}
            TouchRippleProps={{
              style: {
                color: withAlpha(theme.vars.palette.primary.main, 0.3)
              }
            }}
          >
            {item.icon && (
              <ListItemAvatar sx={{ minWidth: 60 }}>
                <Avatar variant="rounded" sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: 'grey.100' }}>
                  <SvgIcon type={IconType.CUSTOM} {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })} />
                </Avatar>
              </ListItemAvatar>
            )}
            <ListItemText
              primary={item.title}
              secondary={item.content}
              slotProps={{ primary: { variant: 'subtitle1', sx: { mb: 0.5 } } }}
            />
          </ListItemButton>
        ))}
      </List>
      {footerData && <Box sx={{ p: 2.5, bgcolor: 'grey.100', ...footerSX }}>{footerData}</Box>}
    </>
  );
}

MegaMenu3.propTypes = { menuItems: PropTypes.array, footerData: PropTypes.node, popperWidth: PropTypes.number, footerSX: PropTypes.any };
