'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// third-party
import { motion } from 'motion/react';

// @project
import { navbar9Height } from '../Navbar9';
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import LogoSection from '@/components/logo';
import { MenuPopper, NavMenu, NavMenuDrawer, NavPrimaryButton, NavSecondaryButton, Customization } from '@/components/navbar';
import SvgIcon from '@/components/SvgIcon';
import { withAlpha } from '@/utils/colorUtils';

/***************************  NAVBAR - CONTENT 9  ***************************/

/**
 *
 * Demos:
 * - [NavbarContent9](https://www.saasable.io/blocks/navbar/navbar9)
 *
 * API:
 * - [NavbarContent9 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/navbar/navbar-content/navbarcontent9#props-details)
 */

export default function NavbarContent9({ landingBaseUrl, navItems, primaryBtn, secondaryBtn, customization, selectedTheme, animated }) {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 3 }}>
        <LogoSection isIcon={true} to={landingBaseUrl} />
        {!downMD && navItems && (
          <Box>
            <NavMenu {...{ navItems, menuTextColor: theme.vars.palette.text.secondary }} />
          </Box>
        )}
      </Stack>
      <Stack direction="row" sx={{ gap: { xs: 1, md: 1.5 } }}>
        {customization && <Customization selectedTheme={selectedTheme} />}
        {!downSM && (
          <>
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
          </>
        )}
        {downMD && (
          <Box sx={{ flexGrow: 1 }}>
            <MenuPopper
              offset={downSM ? 12 : 24}
              toggleProps={{
                children: <SvgIcon name="tabler-menu-2" color="text.primary" />,
                color: 'inherit',
                sx: { minWidth: 40, width: 40, height: 40, p: 0 }
              }}
            >
              <ContainerWrapper
                sx={{
                  height: 'auto',
                  maxHeight: { xs: `calc(100vh - ${navbar9Height.xs}px)`, sm: `calc(100vh - ${navbar9Height.sm}px)` },
                  overflowY: 'auto'
                }}
              >
                {navItems && (
                  <Box sx={{ mx: -2 }}>
                    <NavMenuDrawer {...{ navItems, menuTextColor: theme.vars.palette.text.secondary }} />
                  </Box>
                )}
                {downSM && (
                  <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 1, px: 2, py: 2.5, mx: -2, bgcolor: 'grey.100' }}>
                    {secondaryBtn && <NavSecondaryButton fullWidth {...secondaryBtn} />}
                    {primaryBtn && (
                      <ButtonAnimationWrapper style={{ width: '100%' }}>
                        <NavPrimaryButton fullWidth {...primaryBtn} />
                      </ButtonAnimationWrapper>
                    )}
                  </Stack>
                )}
              </ContainerWrapper>
            </MenuPopper>
          </Box>
        )}
      </Stack>
    </Stack>
  );
}

NavbarContent9.propTypes = {
  landingBaseUrl: PropTypes.any,
  navItems: PropTypes.any,
  primaryBtn: PropTypes.any,
  secondaryBtn: PropTypes.any,
  customization: PropTypes.any,
  selectedTheme: PropTypes.any,
  animated: PropTypes.any
};
