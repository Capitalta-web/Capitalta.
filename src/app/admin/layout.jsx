'use client';

import { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Avatar, Menu, MenuItem, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { IconLogout, IconSettings, IconFileText, IconDashboard } from '@tabler/icons-react';

const DRAWER_WIDTH = 260;

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { user, isProcessing } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [, setMobileOpen] = useState(false);

  // Redirect non-admin users
  useEffect(() => {
    if (user && user.role !== 'admin') {
      console.log('Non-admin user detected, redirecting to cliente...');
      router.replace('/dashboard/cliente');
      return;
    }
  }, [user?.role, router]);

  // Show loading while processing OR if redirecting
  if (isProcessing || (user && user.role !== 'admin')) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Cargando...</Typography>
      </Box>
    );
  }

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const { logout } = await import('@/utils/api/auth');
    await logout();
  };

  const navItems = [
    { icon: IconDashboard, label: 'Dashboard', path: '/admin' },
    { icon: IconFileText, label: 'Solicitudes', path: '/admin/solicitudes' },
    { icon: IconSettings, label: 'Configuración', path: '/admin/configuracion' },
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Capitalta
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Admin Dashboard
        </Typography>
      </Box>

      <List sx={{ flex: 1, pt: 2 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = typeof window !== 'undefined' && window.location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  mx: 1,
                  mb: 1,
                  borderRadius: 1,
                  bgcolor: isActive ? 'primary.lighter' : 'transparent',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'inherit', minWidth: 40 }}>
                  <Icon size={20} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'primary.main' : 'inherit'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={handleProfileClick}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
            {user?.full_name?.charAt(0) || 'A'}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.full_name || 'Admin'}
            </Typography>
            <Typography variant="caption" color="textSecondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
              {user?.email}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fafafa' }}>
      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid #e0e0e0',
            bgcolor: '#fff',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* AppBar */}
        <AppBar
          position="static"
          sx={{
            bgcolor: '#fff',
            color: 'text.primary',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Toolbar>
            <Box sx={{ flex: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{ width: 36, height: 36, bgcolor: 'primary.main', cursor: 'pointer' }}
                onClick={handleProfileClick}
              >
                {user?.full_name?.charAt(0) || 'A'}
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem disabled>
            <Typography variant="body2" color="textSecondary">
              {user?.email}
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <IconLogout size={18} />
            </ListItemIcon>
            Cerrar Sesión
          </MenuItem>
        </Menu>

        {/* Page Content */}
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <Container maxWidth="lg" sx={{ py: 3 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
