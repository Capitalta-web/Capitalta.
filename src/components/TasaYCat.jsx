'use client';
import PropTypes from 'prop-types';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { CAT, TASA_ANUAL_FIJA } from '@/data/datosNegocio';

/***************************  HELPERS  ***************************/

export function textoTasa() {
  return `Tasa de interés fija del ${TASA_ANUAL_FIJA}% anual`;
}

/** Texto del CAT o `null` mientras no esté confirmado en `datosNegocio.js`. */
export function textoCat() {
  if (CAT.valor === null || CAT.valor === undefined) return null;
  const partes = [`CAT promedio ${CAT.valor}%${CAT.sinIva ? ' sin IVA' : ''}.`, CAT.leyenda];
  if (CAT.fechaCalculo) partes.push(`Fecha de cálculo: ${CAT.fechaCalculo}.`);
  if (CAT.vigencia) partes.push(`${CAT.vigencia}.`);
  return partes.join(' ');
}

/***************************  TASA Y CAT  ***************************/

/**
 * Muestra la tasa anual y, junto a ella, el CAT cuando esté capturado en `src/data/datosNegocio.js`.
 * Usar este componente en cualquier lugar donde se publique la tasa (requisito CONDUSEF/Banxico).
 * Con `mostrarTasa={false}` solo pinta el CAT (para lugares donde la tasa ya aparece en el texto).
 */
export default function TasaYCat({ variant = 'body2', color, align, sx, mostrarTasa = true }) {
  const cat = textoCat();
  if (!mostrarTasa && !cat) return null;
  return (
    <Stack spacing={0.25} sx={sx} data-slot="tasa-y-cat">
      {mostrarTasa && (
        <Typography variant={variant} sx={{ color, textAlign: align }}>
          {textoTasa()}.
        </Typography>
      )}
      {cat && (
        <Typography variant="caption" sx={{ color, textAlign: align, opacity: 0.85 }} data-slot="cat">
          {cat}
        </Typography>
      )}
    </Stack>
  );
}

TasaYCat.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.any,
  align: PropTypes.string,
  sx: PropTypes.any,
  mostrarTasa: PropTypes.bool
};
