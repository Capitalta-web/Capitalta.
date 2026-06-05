'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// third-party
import { motion } from 'motion/react';

// @project
import { navbar6Height } from '../Navbar6';
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import Logo from '@/components/logo';
import { Customization, MenuPopper, NavPrimaryButton, NavSecondaryButton, SocialIcons } from '@/components/navbar';
import { NavMenu, NavMenuDrawer } from '@/components/navbar/NavItems';
import SvgIcon from '@/components/SvgIcon';
import { withAlpha } from '@/utils/colorUtils';

/***************************  NAVBAR - CONTENT 6  ***************************/

/**
 *
 * Demos:
 * - [NavbarContent6](https://www.Capitalta.io/blocks/navbar/navbar6)
 *
 * API:
 * - [NavbarContent6 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/navbar/navbar-content/navbarcontent6#props-details)
 */

export default function NavbarContent6({ landingBaseUrl, navItems, primaryBtn, secondaryBtn, customization, selectedTheme, animated }) {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  // Remove the last item from navItems
  const navItemsWithoutLast = navItems ? [...navItems] : []; // Create a copy of navItems
  if (!downSM) {
    navItemsWithoutLast.pop(); // Remove the last item
  }

  const lastItem = navItems?.slice(-1)[0];

  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', width: 1 }}>
      {downMD && <Logo to={landingBaseUrl} />}
      {navItems && !downMD && (
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 0.75, width: 1 }}>
          <Box>
            <NavMenu {...{ navItems: navItemsWithoutLast, menuTextColor: theme.vars.palette.text.secondary }} />
          </Box>
          <Logo sx={{ mx: 1.5 }} to={landingBaseUrl} />
          <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
            {lastItem && <NavMenu {...{ navItems: [lastItem], menuTextColor: theme.vars.palette.text.secondary }} />}
            <SocialIcons sx={{ gap: 0.75 }} />
            {customization && <Customization selectedTheme={selectedTheme} />}
            {secondaryBtn && <NavSecondaryButton {...secondaryBtn} />}
            {primaryBtn && (
              <ButtonAnimationWrapper>
                {animated ? (
                  <motion.div
                    initial={{ borderRadius: '50px' }}
                    animate={{
                      boxShadow: [
                        `0px 0px 0px 0px ${withAlpha(theme.vars.palette.primary.main, 0.7)}`,
                        `0px 0px 0px 8px ${withAlpha(theme.vars.palette.primary.main, 0)}`,
                        `0px 0px 0px 0px ${withAlpha(theme.vars.palette.primary.main, 0)}`
                      ],
                      borderRadius: '50px'
                    }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  >
                    <NavPrimaryButton {...primaryBtn} />
                  </motion.div>
                ) : (
                  <NavPrimaryButton {...primaryBtn} />
                )}
              </ButtonAnimationWrapper>
            )}
          </Stack>
        </Stack>
      )}
      {downMD && (
        <Box sx={{ display: 'flex' }}>
          {!downSM && (
            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75, height: 40 }}>
              {lastItem && <NavMenu {...{ navItems: [lastItem], menuTextColor: theme.vars.palette.text.secondary }} />}
              <SocialIcons sx={{ gap: 0.75 }} />
              {customization && <Customization selectedTheme={selectedTheme} />}
              {secondaryBtn && <NavSecondaryButton {...secondaryBtn} />}
              {primaryBtn && (
                <ButtonAnimationWrapper>
                  <NavPrimaryButton {...primaryBtn} />
                </ButtonAnimationWrapper>
              )}
            </Stack>
          )}
          <MenuPopper
            offset={downSM ? 12 : 16}
            toggleProps={{
              children: <SvgIcon name="tabler-menu-2" color="text.primary" />,
              color: 'inherit',
              sx: { minWidth: 40, width: 40, height: 40, p: 0 }
            }}
          >
            <ContainerWrapper
              sx={{
                height: 'auto',
                maxHeight: { xs: `calc(100vh - ${navbar6Height.xs}px)`, sm: `calc(100vh - ${navbar6Height.sm}px)` },
                overflowY: 'auto'
              }}
            >
              {navItems && (
                <Box sx={{ mx: -2 }}>
                  <NavMenuDrawer {...{ navItems: navItemsWithoutLast, menuTextColor: theme.vars.palette.text.secondary }} />
                </Box>
              )}
              {downSM && (
                <>
                  <Divider />
                  <Stack direction="row" sx={{ justifyContent: 'space-between', gap: { xs: 1, md: 1.5 }, py: 2.5, width: 1 }}>
                    <SocialIcons sx={{ gap: 0.75 }} />
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                      {secondaryBtn && <NavSecondaryButton {...secondaryBtn} />}
                      {primaryBtn && (
                        <ButtonAnimationWrapper>
                          <NavPrimaryButton {...primaryBtn} />
                        </ButtonAnimationWrapper>
                      )}
                    </Stack>
                  </Stack>
                </>
              )}
            </ContainerWrapper>
          </MenuPopper>
        </Box>
      )}
    </Stack>
  );
}

NavbarContent6.propTypes = {
  landingBaseUrl: PropTypes.any,
  navItems: PropTypes.any,
  primaryBtn: PropTypes.any,
  secondaryBtn: PropTypes.any,
  customization: PropTypes.any,
  selectedTheme: PropTypes.any,
  animated: PropTypes.any
};
