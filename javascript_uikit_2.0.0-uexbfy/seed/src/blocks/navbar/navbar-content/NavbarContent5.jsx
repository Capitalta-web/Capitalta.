'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import { navbar5Height } from '../Navbar5';
import ContainerWrapper from '@/components/ContainerWrapper';
import Logo from '@/components/logo';
import { Customization, MenuPopper, NavPrimaryButton, NavSecondaryButton, SearchInput } from '@/components/navbar';
import { NavMenu, NavMenuDrawer } from '@/components/navbar/NavItems';
import SvgIcon from '@/components/SvgIcon';
import { withAlpha } from '@/utils/colorUtils';

/***************************  NAVBAR - CONTENT 5  ***************************/

/**
 *
 * Demos:
 * - [NavbarContent5](https://www.saasable.io/blocks/navbar/navbar5)
 *
 * API:
 * - [NavbarContent5 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/navbar/navbar-content/navbarcontent5#props-details)
 */

export default function NavbarContent5({ landingBaseUrl, navItems, primaryBtn, secondaryBtn, customization, selectedTheme }) {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

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
          <Stack
            direction="row"
            sx={{
              height: 40,
              border: `1px solid ${withAlpha(theme.vars.palette.primary.main, 0.5)}`,
              borderRadius: 25,
              '&:hover': { borderColor: 'primary.main' },
              ':focus-within': { outline: 1, outlineColor: 'primary.main', outlineOffset: 0 }
            }}
          >
            <IconButton
              rel="noopener noreferrer"
              aria-label="search"
              size="small"
              sx={{ width: 48, height: 38, '&.Mui-focusVisible': { outline: 'none' } }}
              color="primary"
              onClick={handleChange}
              tabIndex={checked ? -1 : 0}
            >
              <SvgIcon name="tabler-search" size={18} stroke={2} />
            </IconButton>
            <Collapse orientation="horizontal" in={checked} sx={{ '& .MuiCollapse-wrapperInner': { width: 124 } }}>
              <InputBase
                placeholder="Search here"
                sx={{ typography: 'body2', color: 'text.secondary', '&.MuiInputBase-root': { p: '6px 8px', height: 40 } }}
                slotProps={{ input: { sx: { p: 0 } } }}
                size="small"
              />
            </Collapse>
          </Stack>
        )}
        <Stack direction="row" sx={{ alignItems: 'center', gap: { xs: 1, md: 1.5 } }}>
          {customization && <Customization selectedTheme={selectedTheme} />}
          {!downSM && (
            <>
              {secondaryBtn && <NavSecondaryButton {...secondaryBtn} sx={{ px: 2, ...(secondaryBtn?.sx && { ...secondaryBtn.sx }) }} />}
              {primaryBtn && (
                <NavPrimaryButton {...primaryBtn} sx={{ minWidth: 105, px: 2, ...(primaryBtn?.sx && { ...primaryBtn.sx }) }} />
              )}
            </>
          )}
        </Stack>
        {downMD && (
          <Box sx={{ flexGrow: 1 }}>
            <MenuPopper
              offset={downSM ? 12 : 16}
              toggleProps={{
                children: <SvgIcon name="tabler-menu-2" color="text.primary" />,
                color: 'inherit',
                sx: { minWidth: 40, width: 40, height: 40, p: 0, borderColor: 'primary.light' }
              }}
            >
              <ContainerWrapper
                sx={{
                  height: 'auto',
                  maxHeight: { xs: `calc(100vh - ${navbar5Height.xs}px)`, sm: `calc(100vh - ${navbar5Height.sm}px)` },
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
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, my: 2.5 }}>
                      {secondaryBtn && <NavSecondaryButton fullWidth {...secondaryBtn} />}
                      {primaryBtn && <NavPrimaryButton fullWidth {...primaryBtn} />}
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

NavbarContent5.propTypes = {
  landingBaseUrl: PropTypes.any,
  navItems: PropTypes.any,
  primaryBtn: PropTypes.any,
  secondaryBtn: PropTypes.any,
  customization: PropTypes.any,
  selectedTheme: PropTypes.any
};
