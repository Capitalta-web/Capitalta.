'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

// @icons
import { IconEye, IconEyeOff, IconBrandGoogle, IconArrowRight, IconChecks } from '@tabler/icons-react';

// @project
import Logo from '@/components/logo';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

export default function RegistrationPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form State
  const [monto, setMonto] = useState(1000000);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createSupabaseBrowserClient();
      
      // 1. Registro directo con Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.nombre,
            phone: formData.telefono,
            monto_interes: monto
          }
        }
      });

      if (authError) throw authError;

      // 2. Si el registro es exitoso, mostramos mensaje o redirigimos
      if (data?.user) {
        setSuccess(true);
      }

    } catch (err) {
      console.error(err);
      setError(err.message || 'Ocurrió un error al registrarse. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
        <Container maxWidth="sm">
          <Paper elevation={0} sx={{ p: 5, textAlign: 'center', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ mb: 3, display: 'inline-flex', p: 2, borderRadius: '50%', bgcolor: 'success.lighter', color: 'success.main' }}>
              <IconChecks size={48} />
            </Box>
            <Typography variant="h3" gutterBottom>¡Registro Exitoso!</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Hemos enviado un correo de confirmación a <strong>{formData.email}</strong>. 
              Por favor revisa tu bandeja de entrada para activar tu cuenta.
            </Typography>
            <Button variant="contained" fullWidth size="large" href="/auth/login">
              Ir a Iniciar Sesión
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh' }}>
        {/* Left Side - Visual & Value Prop */}
        <Box sx={{ width: { xs: '100%', md: '41.66%' }, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', bgcolor: 'primary.main', color: 'primary.contrastText', position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, background: 'radial-gradient(circle at top right, #ffffff 0%, transparent 40%)' }} />
          
          <Box sx={{ p: 6, zIndex: 1, height: '100vh', position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Logo isIcon={false} sx={{ width: 140, filter: 'brightness(0) invert(1)' }} />
            
            <Box>
              <Typography variant="h2" sx={{ mb: 3, fontWeight: 700 }}>
                Impulsa tu negocio hoy mismo.
              </Typography>
              <Stack spacing={2}>
                {['Aprobación en 48 horas', 'Sin costos ocultos', 'Trámite 100% digital', 'Asesoría personalizada'].map((item, index) => (
                  <Stack key={index} direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconChecks size={14} />
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{item}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            <Box sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, backdropFilter: 'blur(10px)' }}>
              <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                "Capitalta entendió nuestras necesidades cuando otros bancos nos cerraron la puerta. El proceso fue rápido y transparente."
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Carlos Mendoza</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>Director General, TechSolutions</Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* Right Side - Form */}
        <Box sx={{ width: { xs: '100%', md: '58.33%' }, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 3, sm: 6 } }}>
          <Container maxWidth="sm">
            <Box sx={{ mb: 5, display: { xs: 'block', md: 'none' } }}>
              <Logo />
            </Box>

            <Stack spacing={1} sx={{ mb: 4 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, fontSize: { xs: '1.75rem', sm: '2.25rem' } }}>
                Crea tu cuenta
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Comienza tu solicitud en menos de 2 minutos.
              </Typography>
            </Stack>

            <form onSubmit={handleRegister}>
              <Stack spacing={3}>
                
                {/* Monto Slider Section */}
                <Box sx={{ p: { xs: 2, sm: 3 }, border: '1px solid', borderColor: 'divider', borderRadius: 3, bgcolor: 'grey.50' }}>
                  <Typography variant="subtitle2" gutterBottom>¿Cuánto capital necesitas?</Typography>
                  <Typography variant="h4" color="primary.main" sx={{ mb: 2, fontWeight: 700, fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                    ${monto.toLocaleString()} MXN
                  </Typography>
                  <Slider
                    value={monto}
                    min={50000}
                    max={50000000}
                    step={50000}
                    onChange={(_, val) => setMonto(val)}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(val) => `$${val/1000000}M`}
                  />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">$50k</Typography>
                    <Typography variant="caption" color="text.secondary">$50M</Typography>
                  </Stack>
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Nombre completo"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Teléfono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <TextField
                  fullWidth
                  label="Contraseña"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  helperText="Mínimo 8 caracteres"
                />

                {error && <Alert severity="error">{error}</Alert>}

                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  endIcon={!loading && <IconArrowRight size={20} />}
                  sx={{ py: 1.5, fontSize: '1rem', fontWeight: 600 }}
                >
                  {loading ? 'Procesando...' : 'Crear cuenta y continuar'}
                </Button>

                <Divider>
                  <Typography variant="caption" color="text.secondary">O regístrate con</Typography>
                </Divider>

                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  startIcon={<IconBrandGoogle />}
                  onClick={() => alert('Próximamente: Registro con Google')}
                  sx={{ py: 1.5, color: 'text.primary', borderColor: 'divider' }}
                >
                  Google
                </Button>
              </Stack>
            </form>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                ¿Ya tienes una cuenta?{' '}
                <Link href="/auth/login" style={{ fontWeight: 600, color: 'inherit', textDecoration: 'none' }}>
                  Inicia sesión
                </Link>
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
