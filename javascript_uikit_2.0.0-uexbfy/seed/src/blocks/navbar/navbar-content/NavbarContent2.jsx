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
import { navbar2Height } from '../Navbar2';
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import Logo from '@/components/logo';
import { Customization, Localization, MenuPopper, NavMenu, NavMenuDrawer, NavPrimaryButton, NavSecondaryButton } from '@/components/navbar';
import SvgIcon from '@/components/SvgIcon';
import { withAlpha } from '@/utils/colorUtils';

/***************************  NAVBAR - CONTENT 2  ***************************/

/**
 *
 * Demos:
 * - [NavbarContent2](https://www.saasable.io/blocks/navbar/navbar2)
 *
 * API:
 * - [NavbarContent2 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/navbar/navbar-content/navbarcontent2#props-details)
 */

export default function NavbarContent2({ landingBaseUrl, navItems, primaryBtn, secondaryBtn, customization, selectedTheme, animated }) {
  const theme = useTheme();

  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Logo to={landingBaseUrl} />
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
        {!downMD && navItems && (
          <Box sx={{ flexGrow: 1 }}>
            <NavMenu {...{ navItems }} />
          </Box>
        )}
        <Stack direction="row" sx={{ gap: { xs: 1, md: 1.5 } }}>
          {customization && <Customization selectedTheme={selectedTheme} />}
          {!downSM && (
            <>
              <Localization />
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
            <Box sx={{ flexGrow: 1, ...(!navItems && downMD && { display: { xs: 'flex', sm: 'none' } }) }}>
              <MenuPopper
                offset={downSM ? 12 : 28}
                toggleProps={{
                  children: <SvgIcon name="tabler-menu-2" color="text.primary" />,
                  color: 'inherit',
                  sx: { minWidth: 40, width: 40, height: 40, p: 0 }
                }}
              >
                <ContainerWrapper
                  sx={{
                    height: 'auto',
                    maxHeight: { xs: `calc(100vh - ${navbar2Height.xs}px)`, sm: `calc(100vh - ${navbar2Height.sm}px)` },
                    overflowY: 'auto'
                  }}
                >
                  {navItems && (
                    <>
                      <Box sx={{ mx: -2 }}>
                        <NavMenuDrawer {...{ navItems }} />
                      </Box>
                      {downSM && <Divider />}
                    </>
                  )}
                  {downSM && (
                    <Stack direction="row" sx={{ justifyContent: 'space-between', gap: { xs: 1, md: 1.5 }, py: 2.5, width: 1 }}>
                      <Localization fullWidth />
                      {secondaryBtn && <NavSecondaryButton {...secondaryBtn} fullWidth />}
                      {primaryBtn && (
                        <ButtonAnimationWrapper style={{ width: '100%' }}>
                          <NavPrimaryButton {...primaryBtn} fullWidth />
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
    </Stack>
  );
}

NavbarContent2.propTypes = {
  landingBaseUrl: PropTypes.any,
  navItems: PropTypes.any,
  primaryBtn: PropTypes.any,
  secondaryBtn: PropTypes.any,
  customization: PropTypes.any,
  selectedTheme: PropTypes.any,
  animated: PropTypes.any
};
