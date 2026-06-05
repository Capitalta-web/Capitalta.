'use client';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import GetImagePath from '@/utils/GetImagePath';

/***************************  CARD - PROFILE CARD 3  ***************************/

export default function ProfileCard3({ avatar, avatarSize = 60, name, role, background, sx }) {
  return (
    <Stack
      sx={{
        gap: 1.5,
        alignItems: 'center',
        ...(background && { p: { xs: 2, sm: 3 }, borderRadius: 10, bgcolor: typeof background === 'boolean' ? 'grey.200' : background }),
        ...sx
      }}
    >
      <Avatar
        src={GetImagePath(avatar)}
        sx={{ width: avatarSize, height: avatarSize }}
        alt="Avatar"
        slotProps={{ img: { loading: 'lazy' } }}
      />
      <Stack sx={{ gap: 0.5, alignItems: 'center' }}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {role}
        </Typography>
      </Stack>
    </Stack>
  );
}

ProfileCard3.propTypes = {
  avatar: PropTypes.any,
  avatarSize: PropTypes.number,
  name: PropTypes.string,
  role: PropTypes.string,
  background: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sx: PropTypes.any
};
