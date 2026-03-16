'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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
  const [resendStatus, setResendStatus] = useState('');

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
    setResendStatus('');

    try {
      const supabase = createSupabaseBrowserClient();

      if (!supabase) {
        throw new Error('No se pudo conectar con el servidor. Verifica tu conexión e intenta de nuevo.');
      }

      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            nombre_completo: formData.nombre,
            nombre: formData.nombre,
            telefono: formData.telefono,
            monto_interes: monto
          }
        }
      });

      if (authError) throw authError;

      if (data?.session) {
        router.push('/dashboard');
        return;
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Ocurrió un error al registrarse. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) throw new Error('No se pudo conectar con el servidor. Verifica tu conexión e intenta de nuevo.');

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: { access_type: 'offline', prompt: 'consent' }
        }
      });

      if (oauthError) throw oauthError;
    } catch (err) {
      console.error(err);
      setError(err.message || 'No se pudo iniciar sesión con Google. Intenta nuevamente.');
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendStatus('');
    setError('');
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: formData.email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
      });
      if (resendError) throw resendError;
      setResendStatus('Correo reenviado. Revisa tu bandeja de entrada y spam.');
    } catch (err) {
      console.error(err);
      setError(err.message || 'No se pudo reenviar el correo. Intenta de nuevo.');
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
              Si tu cuenta requiere confirmación, recibirás un correo en <strong>{formData.email}</strong>. Revisa tu bandeja de entrada y spam.
            </Typography>
            {resendStatus && <Alert severity="success" sx={{ mb: 2 }}>{resendStatus}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Stack spacing={1.5}>
              <Button variant="outlined" fullWidth size="large" disabled={loading} onClick={handleResend}>
                {loading ? 'Enviando...' : 'Reenviar correo de confirmación'}
              </Button>
              <Button variant="contained" fullWidth size="large" onClick={() => router.push('/auth/login?registered=1')}>
                Ir a Iniciar Sesión
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper', overflowX: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh', width: '100%', flexWrap: 'nowrap' }}>
        {/* Left Side - Visual & Value Prop */}
        <Box
          sx={{
            width: { xs: '100%', md: '45%' },
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            position: 'relative',
            flexShrink: 0
          }}
        >
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
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 3, sm: 6 }, minHeight: '100vh' }}>
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
                  onClick={handleGoogleSignup}
                  disabled={loading}
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
