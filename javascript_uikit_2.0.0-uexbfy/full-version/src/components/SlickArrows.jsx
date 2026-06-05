import PropTypes from 'prop-types';

// @mui
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

// @project
import SvgIcon from './SvgIcon';

/***************************  COMMON - SLICK ARROWS  ***************************/

export default function SlickArrows({ sliderRef }) {
  const buttonStyle = { height: 64, width: 64, borderRadius: '50%', border: '1px solid', borderColor: 'grey.600' };

  return (
    <Stack direction="row" sx={{ alignItems: 'end', justifyContent: 'center', gap: 1.5 }}>
      <IconButton sx={buttonStyle} onClick={() => sliderRef.current?.slickPrev()} rel="noopener noreferrer" aria-label="previous">
        <SvgIcon name="tabler-arrow-left" />
      </IconButton>
      <IconButton sx={buttonStyle} onClick={() => sliderRef.current?.slickNext()} rel="noopener noreferrer" aria-label="next">
        <SvgIcon name="tabler-arrow-right" />
      </IconButton>
    </Stack>
  );
}

SlickArrows.propTypes = { sliderRef: PropTypes.any };
