'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import { navbar7Height } from '../Navbar7';
import ContainerWrapper from '@/components/ContainerWrapper';
import Logo from '@/components/logo';
import { Customization, MenuPopper, NavPrimaryButton, NavSecondaryButton } from '@/components/navbar';
import { NavMenu, NavMenuDrawer } from '@/components/navbar/NavItems';
import SvgIcon from '@/components/SvgIcon';

/***************************  NAVBAR - CONTENT 7  ***************************/

/**
 *
 * Demos:
 * - [NavbarContent7](https://www.saasable.io/blocks/navbar/navbar7)
 *
 * API:
 * - [NavbarContent7 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/navbar/navbar-content/navbarcontent7#props-details)
 */

export default function NavbarContent7({ landingBaseUrl, navItems, primaryBtn, secondaryBtn, customization, selectedTheme }) {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
      <Logo to={landingBaseUrl} />
      <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
        {navItems && !downMD && (
          <Box sx={{ flexGrow: 1 }}>
            <NavMenu {...{ navItems, menuTextColor: theme.vars.palette.text.secondary }} />
          </Box>
        )}
        {!downSM && (
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
            {secondaryBtn && <NavSecondaryButton variant="text" {...secondaryBtn} />}
            {primaryBtn && (
              <NavPrimaryButton
                variant="text"
                endIcon={<SvgIcon name="tabler-arrow-narrow-right" size={16} />}
                {...primaryBtn}
                sx={{ minWidth: 105, px: 2, ...(primaryBtn.sx && { ...primaryBtn.sx }) }}
              />
            )}
          </Stack>
        )}
        {customization && <Customization selectedTheme={selectedTheme} />}
        {downMD && (
          <Box sx={{ flexGrow: 1 }}>
            <MenuPopper
              offset={downSM ? 12 : 25}
              toggleProps={{
                children: <SvgIcon name="tabler-menu-2" color="text.primary" />,
                color: 'inherit',
                sx: { minWidth: 40, width: 40, height: 40, p: 0 }
              }}
            >
              <ContainerWrapper
                sx={{
                  height: 'auto',
                  maxHeight: { xs: `calc(100vh - ${navbar7Height.xs}px)`, sm: `calc(100vh - ${navbar7Height.sm}px)` },
                  overflowY: 'auto'
                }}
              >
                {navItems && (
                  <Box sx={{ mx: -2 }}>
                    <NavMenuDrawer {...{ navItems, menuTextColor: theme.vars.palette.text.secondary }} />
                  </Box>
                )}
                {downSM && (
                  <>
                    <Divider />
                    <Stack direction="row" sx={{ gap: 1, alignItems: 'center', my: 1.25 }}>
                      {secondaryBtn && <NavSecondaryButton fullWidth {...secondaryBtn} />}
                      {primaryBtn && (
                        <NavPrimaryButton
                          fullWidth
                          variant="text"
                          endIcon={<SvgIcon name="tabler-arrow-narrow-right" size={16} stroke={2.5} />}
                          {...primaryBtn}
                        />
                      )}
                    </Stack>
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

NavbarContent7.propTypes = {
  landingBaseUrl: PropTypes.any,
  navItems: PropTypes.any,
  primaryBtn: PropTypes.any,
  secondaryBtn: PropTypes.any,
  customization: PropTypes.any,
  selectedTheme: PropTypes.any
};
