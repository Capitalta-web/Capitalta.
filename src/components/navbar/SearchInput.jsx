import PropTypes from 'prop-types';
// @mui
import OutlinedInput from '@mui/material/OutlinedInput';

// @project
import SvgIcon from '@/components/SvgIcon';

/***************************  NAVBAR - SEARCH INPUT ***************************/

export default function SearchInput({ sx, ...rest }) {
  return (
    <OutlinedInput
      placeholder="Search here"
      slotProps={{ input: { 'aria-label': 'Search area', sx: { px: 2, py: 1.25 } }, notchedOutline: { sx: { borderRadius: 25 } } }}
      {...rest}
      sx={{ typography: 'body2', color: 'text.secondary', width: 1, pr: 2, ...sx }}
      size="small"
      endAdornment={<SvgIcon name="tabler-search" size={24} color="grey.900" />}
    />
  );
}

SearchInput.propTypes = { sx: PropTypes.any, rest: PropTypes.any };
