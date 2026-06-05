'use client';
import PropTypes from 'prop-types';

// @mui
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/***************************  CARD - PROFILE CARD 4  ***************************/

export default function ProfileCard4({ name, role }) {
  return (
    <Stack direction="row" sx={{ gap: 1.5 }}>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ height: 1, my: 0, borderColor: 'primary.main' }} />
      <Stack sx={{ gap: 0.5 }}>
        <Typography variant="h4">{name}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{role}</Typography>
      </Stack>
    </Stack>
  );
}

ProfileCard4.propTypes = { name: PropTypes.string, role: PropTypes.string };
