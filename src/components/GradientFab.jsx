import PropTypes from 'prop-types';

// @mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import RoundFab from '@/images/graphics/RoundFab';
import StarFab from '@/images/graphics/StarFab';

/***************************  COMMON - GRADIENT FAB  ***************************/

export default function GradientFab({ icon, type, size }) {
  return (
    <Stack sx={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      {type === 'star' ? <StarFab size={size} /> : <RoundFab size={size} />}
      <Box sx={{ background: 'none', position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%)` }}>{icon}</Box>
    </Stack>
  );
}

GradientFab.propTypes = { icon: PropTypes.node, type: PropTypes.string, size: PropTypes.number };
