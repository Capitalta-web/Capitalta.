'use client';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import { navbar8Height } from '../Navbar8';
import ContainerWrapper from '@/components/ContainerWrapper';
import LogoSection from '@/components/logo';
import { Customization, MenuPopper, NavPrimaryButton, NavSecondaryButton } from '@/components/navbar';
import { NavMenu, NavMenuDrawer } from '@/components/navbar/NavItems';
import SvgIcon from '@/components/SvgIcon';

/***************************  NAVBAR - CONTENT 8  ***************************/

/**
 *
 * Demos:
 * - [NavbarContent8](https://www.Capitalta.io/blocks/navbar/navbar8)
 *
 * API:
 * - [NavbarContent8 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/navbar/navbar-content/navbarcontent8#props-details)
 */

export default function NavbarContent8({ landingBaseUrl, navItems, primaryBtn, secondaryBtn, customization, selectedTheme }) {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [menuItems1, setMenuItems1] = useState([]);
  const [menuItems2, setMenuItems2] = useState([]);

  // Splits navItems into two arrays, menuItems1 and menuItems2, for display purposes
  useEffect(() => {
    if (navItems?.length) {
      const length = navItems.length;
      const mid = Math.ceil(length / 2);
      const part1 = navItems.slice(0, mid);
      const part2 = navItems.slice(mid);
      setMenuItems1(part1);
      setMenuItems2(part2);
    }
  }, [navItems]);

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: { xs: 'space-between', sm: 'center' },
        '& .MuiButtonBase-root': { px: { sm: 2, md: 3 }, '&[position="relative"]': { pr: { sm: 4, md: 5 } } }
      }}
    >
      {downSM && <LogoSection isIcon={true} to={landingBaseUrl} />}
      {!downSM && (
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', gap: 0.75 }}>
          {navItems &&
            menuItems1.map((item) => <NavMenu key={item.id} navItems={[item]} menuTextColor={theme.vars.palette.text.secondary} />)}
          <Box sx={{ mx: { sm: 1.5, md: 7.25 } }}>
            <LogoSection isIcon={true} to={landingBaseUrl} />
          </Box>
          {navItems &&
            menuItems2.map((item) => <NavMenu key={item.id} navItems={[item]} menuTextColor={theme.vars.palette.text.secondary} />)}
          {primaryBtn && <NavPrimaryButton variant="text" {...primaryBtn} />}
          {secondaryBtn && <NavSecondaryButton variant="text" {...secondaryBtn} />}
          {customization && <Customization selectedTheme={selectedTheme} />}
        </Stack>
      )}
      {downSM && (
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1.25 }}>
          {customization && <Customization selectedTheme={selectedTheme} />}
          <MenuPopper
            offset={12}
            toggleProps={{
              children: <SvgIcon name="tabler-menu-2" color="text.primary" />,
              color: 'inherit',
              sx: { minWidth: 40, width: 40, height: 40, p: 0 }
            }}
          >
            <ContainerWrapper
              sx={{
                height: 'auto',
                maxHeight: { xs: `calc(100vh - ${navbar8Height.xs}px)`, sm: `calc(100vh - ${navbar8Height.sm}px)` },
                overflowY: 'auto'
              }}
            >
              {navItems && (
                <Box sx={{ mx: -2 }}>
                  <NavMenuDrawer {...{ navItems, menuTextColor: theme.vars.palette.text.secondary }} />
                </Box>
              )}
              <Divider />
              <Stack direction="row" sx={{ gap: 1, alignItems: 'center', my: 1.25 }}>
                {secondaryBtn && <NavSecondaryButton fullWidth {...secondaryBtn} />}
                {primaryBtn && <NavPrimaryButton variant="text" fullWidth {...primaryBtn} />}
              </Stack>
            </ContainerWrapper>
          </MenuPopper>
        </Stack>
      )}
    </Stack>
  );
}

NavbarContent8.propTypes = {
  landingBaseUrl: PropTypes.any,
  navItems: PropTypes.any,
  primaryBtn: PropTypes.any,
  secondaryBtn: PropTypes.any,
  customization: PropTypes.any,
  selectedTheme: PropTypes.any
};
