'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @mui
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { useForm, Controller } from 'react-hook-form';

const EXPERIENCE_OPTIONS = ['Sin experiencia', 'Menos de 1 año', '1 a 3 años', 'Más de 3 años'];

const PROFILE_OPTIONS = ['Asesor inmobiliario', 'Asesor financiero o de crédito', 'Abogado', 'Cesión de derechos / recuperación', 'Otro'];

// Acepta acentos, ñ, espacios, apóstrofos, puntos y guiones (ej. "José María", "Peña-López")
const NAME_PATTERN = /^[\p{L}][\p{L}\s.'-]*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const nameRules = (requiredMessage) => ({
  required: requiredMessage,
  maxLength: { value: 80, message: 'Máximo 80 caracteres' },
  validate: (value) => NAME_PATTERN.test(String(value || '').trim()) || 'Usa solo letras'
});

/***************************  FORM - INPUT LABEL  ***************************/

function FieldLabel({ name, htmlFor, optional }) {
  return (
    <Typography component="label" htmlFor={htmlFor} variant="subtitle2" sx={{ color: 'text.secondary' }}>
      {name}
      {optional && (
        <Typography component="span" variant="caption" sx={{ color: 'text.disabled', ml: 0.5 }}>
          (opcional)
        </Typography>
      )}
    </Typography>
  );
}

/***************************  FORM - ERROR MESSAGE  ***************************/

function ErrorMessage({ message }) {
  return (
    <Typography variant="caption" sx={{ color: 'error.main' }}>
      {message}
    </Typography>
  );
}

/***************************  BROKERS - FORM  ***************************/

export default function BrokerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      ciudad: '',
      experiencia: '',
      perfil: '',
      mensaje: '',
      acepta_privacidad: false,
      website: ''
    }
  });

  const onSubmit = async (data) => {
    setSubmitStatus({ type: '', message: '' });
    setIsSubmitting(true);
    try {
      const payload = {
        nombre: String(data.nombre || '').trim(),
        apellido: String(data.apellido || '').trim(),
        email: String(data.email || '').trim(),
        telefono: String(data.telefono || '').replace(/\D/g, ''),
        ciudad: String(data.ciudad || '').trim(),
        experiencia: data.experiencia,
        perfil: data.perfil || null,
        mensaje: String(data.mensaje || '').trim(),
        acepta_privacidad: Boolean(data.acepta_privacidad),
        source_path: typeof window !== 'undefined' ? window.location.pathname : '/quiero-ser-broker',
        website: data.website
      };

      const response = await fetch('/api/brokers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result?.error || 'No pudimos enviar tu registro. Intenta de nuevo.');
      }

      setSubmitStatus({
        type: 'success',
        message: '¡Listo! Recibimos tu registro. Te enviamos un correo de confirmación y un asesor te contactará pronto.'
      });
      reset();
    } catch (err) {
      setSubmitStatus({ type: 'error', message: err?.message || 'Ocurrió un error al enviar tu registro.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack sx={{ gap: 3 }}>
        {submitStatus.message && (
          <Alert severity={submitStatus.type === 'success' ? 'success' : 'error'} role="status">
            {submitStatus.message}
          </Alert>
        )}

        {/* Honeypot anti-spam: invisible para personas, los bots lo llenan */}
        <Box aria-hidden="true" sx={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Nombre(s)" htmlFor="broker-nombre" />
              <OutlinedInput
                id="broker-nombre"
                {...register('nombre', nameRules('Ingresa tu nombre'))}
                placeholder="Tu nombre"
                autoComplete="given-name"
                fullWidth
                error={Boolean(errors.nombre)}
              />
              {errors.nombre?.message && <ErrorMessage message={errors.nombre.message} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Apellidos" htmlFor="broker-apellido" />
              <OutlinedInput
                id="broker-apellido"
                {...register('apellido', nameRules('Ingresa tus apellidos'))}
                placeholder="Tus apellidos"
                autoComplete="family-name"
                fullWidth
                error={Boolean(errors.apellido)}
              />
              {errors.apellido?.message && <ErrorMessage message={errors.apellido.message} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Correo electrónico" htmlFor="broker-email" />
              <OutlinedInput
                id="broker-email"
                type="email"
                {...register('email', {
                  required: 'Ingresa tu correo',
                  validate: (value) => EMAIL_PATTERN.test(String(value || '').trim()) || 'Correo no válido'
                })}
                placeholder="tucorreo@ejemplo.com"
                autoComplete="email"
                fullWidth
                error={Boolean(errors.email)}
              />
              {errors.email?.message && <ErrorMessage message={errors.email.message} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Teléfono / WhatsApp" htmlFor="broker-telefono" />
              <OutlinedInput
                id="broker-telefono"
                type="tel"
                inputMode="numeric"
                {...register('telefono', {
                  required: 'Ingresa tu teléfono',
                  validate: (value) => String(value || '').replace(/\D/g, '').length === 10 || 'Ingresa 10 dígitos'
                })}
                placeholder="55 1234 5678"
                autoComplete="tel-national"
                fullWidth
                startAdornment={<InputAdornment position="start">+52</InputAdornment>}
                error={Boolean(errors.telefono)}
              />
              {errors.telefono?.message && <ErrorMessage message={errors.telefono.message} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Ciudad y estado" htmlFor="broker-ciudad" />
              <OutlinedInput
                id="broker-ciudad"
                {...register('ciudad', {
                  required: 'Indica tu ciudad',
                  maxLength: { value: 80, message: 'Máximo 80 caracteres' }
                })}
                placeholder="Ej. Naucalpan, Edo. Méx."
                autoComplete="address-level2"
                fullWidth
                error={Boolean(errors.ciudad)}
              />
              {errors.ciudad?.message && <ErrorMessage message={errors.ciudad.message} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Experiencia como bróker" htmlFor="broker-experiencia" />
              <Controller
                control={control}
                name="experiencia"
                rules={{ required: 'Selecciona tu experiencia' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="broker-experiencia"
                    displayEmpty
                    fullWidth
                    input={<OutlinedInput />}
                    error={Boolean(errors.experiencia)}
                    renderValue={(value) =>
                      value || (
                        <Typography component="span" sx={{ color: 'text.disabled' }}>
                          Selecciona
                        </Typography>
                      )
                    }
                  >
                    {EXPERIENCE_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.experiencia?.message && <ErrorMessage message={errors.experiencia.message} />}
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="¿A qué te dedicas?" htmlFor="broker-perfil" optional />
              <Controller
                control={control}
                name="perfil"
                render={({ field }) => (
                  <Select
                    {...field}
                    id="broker-perfil"
                    displayEmpty
                    fullWidth
                    input={<OutlinedInput />}
                    renderValue={(value) =>
                      value || (
                        <Typography component="span" sx={{ color: 'text.disabled' }}>
                          Selecciona
                        </Typography>
                      )
                    }
                  >
                    {PROFILE_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Cuéntanos sobre tu cartera o experiencia" htmlFor="broker-mensaje" optional />
              <OutlinedInput
                id="broker-mensaje"
                {...register('mensaje', { maxLength: { value: 1000, message: 'Máximo 1000 caracteres' } })}
                multiline
                rows={3}
                placeholder="Tipo de clientes, zonas donde operas, operaciones cerradas…"
                fullWidth
                error={Boolean(errors.mensaje)}
              />
              {errors.mensaje?.message && <ErrorMessage message={errors.mensaje.message} />}
            </Stack>
          </Grid>
          <Grid size={12}>
            <Controller
              control={control}
              name="acepta_privacidad"
              rules={{ validate: (value) => value === true || 'Debes aceptar el aviso de privacidad' }}
              render={({ field: { value, onChange, ...field } }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} size="small" />}
                  label={
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Acepto el{' '}
                      <Link href="/aviso-de-privacidad" target="_blank" rel="noopener">
                        aviso de privacidad
                      </Link>{' '}
                      y que Capitalta me contacte.
                    </Typography>
                  }
                />
              )}
            />
            {errors.acepta_privacidad?.message && (
              <Box>
                <ErrorMessage message={errors.acepta_privacidad.message} />
              </Box>
            )}
          </Grid>
        </Grid>

        <Button type="submit" color="primary" size="large" variant="contained" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Enviando…' : 'Quiero ser bróker'}
        </Button>
      </Stack>
    </form>
  );
}

FieldLabel.propTypes = { name: PropTypes.string, htmlFor: PropTypes.string, optional: PropTypes.bool };

ErrorMessage.propTypes = { message: PropTypes.string };
