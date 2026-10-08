'use client';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {children}
    </Box>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node
};
