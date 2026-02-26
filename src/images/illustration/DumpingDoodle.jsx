import Box from '@mui/material/Box';

export default function DumpingDoodle(props) {
  return (
    <Box
      sx={{ width: '100%', height: '100%', bgcolor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      {...props}
    >
      DumpingDoodle
    </Box>
  );
}
