'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

// @project
import LogoMain from './LogoMain';
import LogoIcon from './LogoIcon';
import { APP_DEFAULT_PATH } from '@/config';
import { generateFocusStyle } from '@/utils/generateFocusStyle';
import { NextLink } from '@/components/routes';

/***************************  MAIN - LOGO  ***************************/

export default function LogoSection({ isIcon, sx, to }) {
  const theme = useTheme();

  return (
    <NextLink href={!to ? APP_DEFAULT_PATH : to} passHref>
      <ButtonBase disableRipple sx={{ ...sx, '&:focus-visible': generateFocusStyle(theme.vars.palette.primary.main) }} aria-label="logo">
        {isIcon ? <LogoIcon /> : <LogoMain />}
      </ButtonBase>
    </NextLink>
  );
}

LogoSection.propTypes = { isIcon: PropTypes.bool, sx: PropTypes.any, to: PropTypes.string };
