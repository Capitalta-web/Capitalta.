'use client';

import { useTheme } from '@mui/material/styles';

export default function CreditRevolvente({ width = 220, height = 160 }) {
  const theme = useTheme();
  const palette = theme.vars ? theme.vars.palette : theme.palette;

  return (
    <svg width={width} height={height} viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cr_g1" x1="20" y1="20" x2="200" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor={palette.primary.main} stopOpacity="0.25" />
          <stop offset="1" stopColor={palette.primary.light} stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="cr_g2" x1="30" y1="28" x2="190" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor={palette.secondary ? palette.secondary.main : palette.primary.dark} stopOpacity="0.4" />
          <stop offset="1" stopColor={palette.primary.main} stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <path
        d="M164 60c-9-22-31-38-58-38-35 0-64 29-64 64s29 64 64 64c25 0 47-15 57-36"
        stroke="url(#cr_g1)"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path d="M164 48v26h-26" stroke={palette.primary.main} strokeOpacity="0.3" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M56 112v-26h26" stroke={palette.primary.main} strokeOpacity="0.22" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />

      <path
        d="M96 102c0 7 6 12 14 12s14-5 14-12-6-12-14-12-14-5-14-12 6-12 14-12 14 5 14 12"
        stroke="url(#cr_g2)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path d="M110 56v8M110 114v8" stroke={palette.text.primary} strokeOpacity="0.14" strokeWidth="8" strokeLinecap="round" />

      <path d="M40 24h56" stroke={palette.text.primary} strokeOpacity="0.06" strokeWidth="10" strokeLinecap="round" />
      <path d="M24 44h40" stroke={palette.text.primary} strokeOpacity="0.06" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}

