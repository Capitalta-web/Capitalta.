'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';

// @project
import SvgIcon from '@/components/SvgIcon';

/***************************  LOCALIZATION - DATA  ***************************/

const locales = [
  { name: 'English', code: 'en', sample: 'UK' },
  { name: 'Arabic', code: 'ar', sample: 'عربي' },
  { name: 'Chinese', code: 'zh', sample: '中国人' },
  { name: 'French', code: 'fr', sample: 'français' }
];

/***************************  NAVBAR - LOCALIZATION  ***************************/

export default function Localization({ ...rest }) {
  const theme = useTheme();

  const [i18n, setI18n] = useState('en');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'menu-popper' : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="outlined"
        size="small"
        endIcon={<SvgIcon name="tabler-chevron-down" size={16} stroke={2.5} />}
        {...rest}
      >
        {locales
          .filter((locale) => locale.code === i18n)[0]
          .name.slice(0, 3)
          .toUpperCase()}
      </Button>
      <Popper
        placement="bottom"
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        sx={{ zIndex: 1202 }}
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 2]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Fade in={open} {...TransitionProps}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: theme.vars.palette.grey[200], borderRadius: 4 }}>
              <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <Box sx={{ p: 1 }}>
                  <List disablePadding>
                    {locales.map((locale, index) => (
                      <ListItemButton
                        key={index}
                        sx={{ borderRadius: 4, mb: 0.5 }}
                        selected={i18n === locale.code}
                        onClick={() => setI18n(locale.code)}
                      >
                        <ListItemText primary={`${locale.name} (${locale.sample})`} slotProps={{ primary: { variant: 'subtitle1' } }} />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              </ClickAwayListener>
            </Card>
          </Fade>
        )}
      </Popper>
    </>
  );
}

Localization.propTypes = { rest: PropTypes.any };
