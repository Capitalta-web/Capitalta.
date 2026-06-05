'use client';

// @mui
import { keyframes } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

//@project

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(-360deg) }
`;

const dotAnimation = keyframes`
  0% { transform: rotate(-360deg) }
  100% { transform: rotate(0deg) }
`;

/***************************  PAGE LOADER  ***************************/

export default function PageLoader() {
  const commonProps = { disableShrink: true, size: 100, variant: 'determinate', thickness: 4, sx: { color: '#1C7C77' } };

  return (
    <Stack direction="row" sx={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
      <Avatar sx={{ width: 65, height: 65, bgcolor: '#ffffff', padding: 1 }}>
        <img src="/assets/images/capitalta/isotipo.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </Avatar>
      <CircularProgress
        {...commonProps}
        value={100}
        rel="noopener noreferrer"
        aria-label="loading"
        sx={{
          position: 'absolute',
          zIndex: 1,
          color: '#1C7C77',
          '& .MuiCircularProgress-circle': { strokeLinecap: 'round', strokeDasharray: '6 9.5 !important' },
          animation: `${dotAnimation} 6s linear infinite`
        }}
      />
      <CircularProgress
        {...commonProps}
        value={60}
        rel="noopener noreferrer"
        aria-label="loading"
        sx={{
          position: 'absolute',
          zIndex: 1,
          color: '#1C7C77',
          '& .MuiCircularProgress-circle': { strokeLinecap: 'round' },
          animation: `${rotateAnimation} 35s linear infinite`
        }}
      />
    </Stack>
  );
}
