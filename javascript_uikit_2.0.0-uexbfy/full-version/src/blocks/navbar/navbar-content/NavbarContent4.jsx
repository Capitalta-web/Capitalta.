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
import { navbar4Height } from '../Navbar4';
import ContainerWrapper from '@/components/ContainerWrapper';
import LogoSection from '@/components/logo';
import { Customization, MenuPopper, NavPrimaryButton, NavSecondaryButton } from '@/components/navbar';
import { NavMenu, NavMenuDrawer } from '@/components/navbar/NavItems';
import SvgIcon from '@/components/SvgIcon';

/***************************  NAVBAR - CONTENT 4  ***************************/

/**
 *
 * Demos:
 * - [NavbarContent4](https://www.Capitalta.io/blocks/navbar/navbar4)
 *
 * API:
 * - [NavbarContent4 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/navbar/navbar-content/navbarcontent4#props-details)
 */

export default function NavbarContent4({ landingBaseUrl, navItems, primaryBtn, secondaryBtn, customization, selectedTheme }) {
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
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: { xs: 'space-between', sm: 'center' }, width: 1 }}>
      {downSM && <LogoSection isIcon={true} to={landingBaseUrl} />}
      {navItems && !downSM && (
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: { xs: 'space-between', sm: 'center' }, gap: 0.75 }}>
          <>
            {menuItems1.map((item) => (
              <NavMenu key={item.id} navItems={[item]} menuTextColor={theme.vars.palette.text.secondary} />
            ))}
            <Box sx={{ mx: { sm: 1.5, md: 7.25 } }}>
              <LogoSection isIcon={true} to={landingBaseUrl} />
            </Box>
            {menuItems2.map((item) => (
              <NavMenu key={item.id} navItems={[item]} menuTextColor={theme.vars.palette.text.secondary} />
            ))}
            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
              {primaryBtn && <NavPrimaryButton variant="text" {...primaryBtn} />}
              {secondaryBtn && <NavSecondaryButton variant="text" {...secondaryBtn} />}
            </Stack>
          </>
        </Stack>
      )}
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5 }}>
        {customization && <Customization selectedTheme={selectedTheme} />}
        {navItems?.length && downSM && (
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
                maxHeight: { xs: `calc(100vh - ${navbar4Height.xs}px)`, sm: `calc(100vh - ${navbar4Height.sm}px)` },
                overflowY: 'auto'
              }}
            >
              {navItems && (
                <Box sx={{ mx: -2 }}>
                  <NavMenuDrawer {...{ navItems, menuTextColor: theme.vars.palette.text.secondary }} />
                </Box>
              )}
              <Divider />
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, my: 1 }}>
                {secondaryBtn && <NavSecondaryButton fullWidth {...secondaryBtn} />}
                {primaryBtn && <NavPrimaryButton fullWidth variant="text" {...primaryBtn} />}
              </Stack>
            </ContainerWrapper>
          </MenuPopper>
        )}
      </Stack>
    </Stack>
  );
}

NavbarContent4.propTypes = {
  landingBaseUrl: PropTypes.any,
  navItems: PropTypes.any,
  primaryBtn: PropTypes.any,
  secondaryBtn: PropTypes.any,
  customization: PropTypes.any,
  selectedTheme: PropTypes.any
};
