'use client';

// @project
import { Error500Page } from '@/blocks/maintenance';
import ThemeProviders from '@/components/ThemeProvider';

/***************************  ERROR 500 - DATA  ***************************/

const data = {
  primaryBtn: { children: 'Volver al inicio' },
  heading: 'Ocurrió un error. Intenta de nuevo más tarde o contáctanos si el problema continúa.'
};

/***************************  ERROR - 500  ***************************/

export default function InternalServerError() {
  return (
    <ThemeProviders>
      <Error500Page {...data} />
    </ThemeProviders>
  );
}
