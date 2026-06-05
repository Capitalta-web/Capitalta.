'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

// @project
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';
import LogoMain from './LogoMain';
import LogoIcon from './LogoIcon';

/***************************  MAIN - LOGO  ***************************/

export default function LogoSection({ isIcon, sx, to }) {
  const theme = useTheme();
  const palette = theme?.vars ? theme.vars.palette : theme.palette;
  const href = to || '/';

  return (
    <NextLink href={href} passHref>
      <ButtonBase
        disableRipple
        sx={{ ...sx, display: 'block', '&:focus-visible': generateFocusVisibleStyles(palette.primary.main) }}
        rel="noopener noreferrer"
        aria-label="logo"
      >
        {isIcon ? <LogoIcon /> : <LogoMain />}
      </ButtonBase>
    </NextLink>
  );
}

LogoSection.propTypes = { isIcon: PropTypes.bool, sx: PropTypes.any, to: PropTypes.string };
