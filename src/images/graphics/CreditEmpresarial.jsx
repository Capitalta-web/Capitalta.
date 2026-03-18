'use client';

import { useTheme } from '@mui/material/styles';

export default function CreditEmpresarial({ width = 220, height = 160 }) {
  const theme = useTheme();
  const palette = theme.vars ? theme.vars.palette : theme.palette;

  return (
    <svg width={width} height={height} viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ce_g1" x1="12" y1="18" x2="208" y2="154" gradientUnits="userSpaceOnUse">
          <stop stopColor={palette.primary.light} stopOpacity="0.85" />
          <stop offset="1" stopColor={palette.primary.main} stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="ce_g2" x1="18" y1="8" x2="202" y2="152" gradientUnits="userSpaceOnUse">
          <stop stopColor={palette.secondary ? palette.secondary.main : palette.primary.dark} stopOpacity="0.45" />
          <stop offset="1" stopColor={palette.primary.main} stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <path
        d="M20 132V62c0-6 5-11 11-11h34c6 0 11 5 11 11v70"
        stroke="url(#ce_g1)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path d="M88 132V36c0-6 5-11 11-11h26c6 0 11 5 11 11v96" stroke="url(#ce_g2)" strokeWidth="10" strokeLinecap="round" />
      <path
        d="M148 132V78c0-6 5-11 11-11h30c6 0 11 5 11 11v54"
        stroke="url(#ce_g1)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M16 138h188"
        stroke={palette.text.primary}
        strokeOpacity="0.08"
        strokeWidth="8"
        strokeLinecap="round"
      />

      <path d="M42 74v8M54 74v8M66 74v8" stroke={palette.text.primary} strokeOpacity="0.12" strokeWidth="6" strokeLinecap="round" />
      <path d="M110 52v8M110 70v8M110 88v8" stroke={palette.text.primary} strokeOpacity="0.12" strokeWidth="6" strokeLinecap="round" />
      <path d="M172 90v8M184 90v8" stroke={palette.text.primary} strokeOpacity="0.12" strokeWidth="6" strokeLinecap="round" />

      <path
        d="M152 34c10-10 30-8 38 4"
        stroke={palette.primary.main}
        strokeOpacity="0.25"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M192 40c-4 9-13 15-23 14"
        stroke={palette.primary.main}
        strokeOpacity="0.22"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

