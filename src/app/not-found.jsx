'use client';

// @project
import { Error404Page } from '@/blocks/maintenance';
import ThemeProviders from '@/components/ThemeProvider';

/***************************  ERROR 404 - DATA  ***************************/

const data = {
  primaryBtn: { children: 'Regresar', onClick: () => window.history.back() },
  heading: 'No encontramos la página que buscas. Te ayudamos a volver al camino.'
};

/***************************  ERROR - 404  ***************************/

export default function notfound() {
  return (
    <ThemeProviders>
      <Error404Page {...data} />
    </ThemeProviders>
  );
}
