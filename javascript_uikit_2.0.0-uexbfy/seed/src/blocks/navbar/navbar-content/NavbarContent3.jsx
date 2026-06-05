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
import { navbar3Height } from '../Navbar3';
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import Logo from '@/components/logo';
import { Customization, MenuPopper, NavPrimaryButton, NavSecondaryButton, SearchInput } from '@/components/navbar';
import { NavMenu, NavMenuDrawer } from '@/components/navbar/NavItems';
import SvgIcon from '@/components/SvgIcon';
import { withAlpha } from '@/utils/colorUtils';

/***************************  NAVBAR - CONTENT 3  ***************************/

/**
 *
 * Demos:
 * - [NavbarContent3](https://www.saasable.io/blocks/navbar/navbar3)
 *
 * API:
 * - [NavbarContent3 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/navbar/navbar-content/navbarcontent3#props-details)
 */

export default function NavbarContent3({ landingBaseUrl, navItems, primaryBtn, secondaryBtn, customization, selectedTheme, animated }) {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, width: 1 }}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end', gap: 3 }}>
        <Logo to={landingBaseUrl} />
        {navItems && !downMD && (
          <Box sx={{ flexGrow: 1 }}>
            <NavMenu {...{ navItems, menuTextColor: theme.vars.palette.text.secondary }} />
          </Box>
        )}
      </Stack>
      <Stack direction="row" sx={{ gap: { xs: 1, md: 1.5 }, alignItems: 'center' }}>
        {!downSM && (
          <>
            <SearchInput sx={{ width: 172 }} />
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
                    <NavPrimaryButton sx={{ minWidth: 105, px: 2 }} {...primaryBtn} />
                  </motion.div>
                ) : (
                  <NavPrimaryButton sx={{ minWidth: 105, px: 2 }} {...primaryBtn} />
                )}
              </ButtonAnimationWrapper>
            )}
          </>
        )}
        {downMD && (
          <Box sx={{ flexGrow: 1, ...(!navItems && downMD && { display: { xs: 'flex', sm: 'none' } }) }}>
            {downSM && customization && <Customization selectedTheme={selectedTheme} />}
            <MenuPopper
              offset={downSM ? 12 : 16}
              toggleProps={{
                children: <SvgIcon name="tabler-menu-2" color="text.primary" />,
                color: 'inherit',
                sx: { minWidth: 40, width: 40, height: 40, p: 0, ...(downSM && { ml: 1 }) }
              }}
            >
              <ContainerWrapper
                sx={{
                  height: 'auto',
                  maxHeight: { xs: `calc(100vh - ${navbar3Height.xs}px)`, sm: `calc(100vh - ${navbar3Height.sm}px)` },
                  overflowY: 'auto'
                }}
              >
                {downSM && <SearchInput sx={{ mt: 1 }} />}
                {navItems && (
                  <Box sx={{ mx: -2 }}>
                    <NavMenuDrawer {...{ navItems, menuTextColor: theme.vars.palette.text.secondary }} />
                  </Box>
                )}
                {downSM && (
                  <>
                    <Divider />
                    {(primaryBtn || secondaryBtn) && (
                      <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, my: 2.5 }}>
                        {secondaryBtn && <NavSecondaryButton fullWidth {...secondaryBtn} />}
                        {primaryBtn && (
                          <ButtonAnimationWrapper style={{ width: '100%' }}>
                            <NavPrimaryButton fullWidth {...primaryBtn} />
                          </ButtonAnimationWrapper>
                        )}
                      </Stack>
                    )}
                  </>
                )}
              </ContainerWrapper>
            </MenuPopper>
          </Box>
        )}
      </Stack>
    </Stack>
  );
}

NavbarContent3.propTypes = {
  landingBaseUrl: PropTypes.any,
  navItems: PropTypes.any,
  primaryBtn: PropTypes.any,
  secondaryBtn: PropTypes.any,
  customization: PropTypes.any,
  selectedTheme: PropTypes.any,
  animated: PropTypes.any
};
