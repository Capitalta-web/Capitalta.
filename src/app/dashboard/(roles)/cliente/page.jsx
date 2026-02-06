'use client';

import { useState, useEffect } from 'react';
import { Typography, Box, Grid, CircularProgress } from '@mui/material';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

// Components
import StatusWidget from '@/components/dashboard/cliente/StatusWidget';

export default function ClienteDashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeApplication, setActiveApplication] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUser(user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(profile);

        // Fetch active application
        const { data: applications, error } = await supabase
          .from('solicitudes_credito')
          .select('*')
          .eq('cliente_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (applications && applications.length > 0) {
          setActiveApplication(applications[0]);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Hola, {profile?.nombre_completo || profile?.full_name || user?.email?.split('@')[0] || 'Cliente'} 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bienvenido a tu panel de control de Capitalta. Aquí puedes gestionar tus solicitudes de crédito.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Active Application Widget */}
        <Grid item xs={12}>
          <StatusWidget application={activeApplication} />
        </Grid>
      </Grid>
    </Box>
  );
}
