import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';

// @project
import { NextLink } from 'src/components/routes';

/***************************  NAVBAR - SECONDARY BUTTON  ***************************/

export default function NavSecondaryButton({ sx, children, ...rest }) {
  return (
    <Button variant="outlined" size="small" sx={sx} {...rest} {...(rest?.href && { component: NextLink })} rel="noopener noreferrer">
      {children || 'Más información'}
    </Button>
  );
}

NavSecondaryButton.propTypes = { sx: PropTypes.any, children: PropTypes.any, rest: PropTypes.any };
