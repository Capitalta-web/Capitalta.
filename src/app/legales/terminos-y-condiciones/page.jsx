
'use client';

import { useEffect, useState } from 'react';

// @mui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { SECTION_COMMON_PY } from '@/utils/constant';

// Helper functions for scrollspy
const clamp = (value) => Math.max(0, value);
const isBetween = (value, floor, ceil) => value >= floor && value <= ceil;

function useScrollspy(ids, offset = 0) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const listener = () => {
      const scroll = window.scrollY;

      const position = ids
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return { id, top: -1, bottom: -1 };

          const rect = element.getBoundingClientRect();
          const top = clamp(rect.top + scroll - offset);
          const bottom = clamp(rect.bottom + scroll - offset);

          return { id, top, bottom };
        })
        .find(({ top, bottom }) => isBetween(scroll, top, bottom));

      setActiveId(position?.id || '');
    };

    window.addEventListener('scroll', listener);
    window.addEventListener('resize', listener);
    listener();

    return () => {
      window.removeEventListener('scroll', listener);
      window.removeEventListener('resize', listener);
    };
  }, [ids, offset]);

  return activeId;
}

const menuItems = [
  {
    id: 'aviso-legal',
    heading: 'Aviso Legal y Regulatorio',
    caption:
      'Capitalta S.A.P.I. de C.V., SOFOM, E.N.R., para su constitución y operación con carácter de Sociedad Financiera de Objeto Múltiple, Entidad No Regulada, de conformidad con el Artículo 87-J de la Ley General de Organizaciones y Actividades Auxiliares de Crédito, no requiere autorización de la Secretaría de Hacienda y Crédito Público para su constitución y operación y; está sujeta a la supervisión y vigilancia de la Comisión Nacional Bancaria y de Valores para efectos del artículo 56, párrafo segundo y 95 Bis de dicha Ley.'
  },
  {
    id: 'aceptacion',
    heading: 'Aceptación de los términos',
    caption:
      'Al acceder y utilizar este sitio web, aceptas estar sujeto a estos Términos y Condiciones de Uso. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar el sitio web. Capitalta comparte información sobre ti cuando utilizas nuestro sitio web o servicios. Al acceder o utilizar nuestro sitio web, consientes las prácticas descritas en esta política.'
  },
  {
    id: 'cambios',
    heading: 'Cambios en los términos',
    caption:
      'Nos reservamos el derecho de modificar o reemplazar estos términos a nuestra entera discreción. Es tu responsabilidad revisar estos términos periódicamente para ver si hay cambios. Tu uso continuado del sitio web después de la publicación de cualquier cambio constituye la aceptación de dichos cambios.'
  },
  {
    id: 'conducta',
    heading: 'Conducta del usuario',
    caption:
      'Aceptas utilizar este sitio web solo para fines legales y de una manera consistente con todas las leyes y regulaciones locales, nacionales e internacionales aplicables.'
  },
  {
    id: 'propiedad-intelectual',
    heading: 'Propiedad intelectual',
    caption:
      'Todo el contenido de este sitio web, incluyendo pero no limitado a texto, gráficos, logotipos, imágenes, clips de audio, clips de video, descargas digitales y compilaciones de datos, es propiedad de Capitalta o de sus proveedores de contenido y está protegido por las leyes internacionales de derechos de autor.'
  },
  {
    id: 'privacidad',
    heading: 'Política de privacidad',
    caption:
      'No vendemos, intercambiamos ni transferimos de ninguna otra manera tu información personal a terceros. Podemos compartir información con proveedores de servicios de confianza que nos ayudan a operar nuestro sitio web, llevar a cabo nuestro negocio o brindarte servicio, siempre que dichas partes acuerden mantener esta información confidencial.'
  },
  {
    id: 'responsabilidad',
    heading: 'Limitación de responsabilidad',
    caption:
      'Capitalta no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que surja del uso o la imposibilidad de uso de nuestro sitio web o servicios.'
  }
];

export default function TerminosCondicionesPage() {
  const activeId = useScrollspy(
    menuItems.map((item) => item.id),
    100
  );

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ position: 'sticky', top: 100 }}>
            <List component="nav">
              {menuItems.map((item, index) => (
                <ListItemButton
                  key={index}
                  component="a"
                  href={`#${item.id}`}
                  selected={activeId === item.id}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    borderLeft: '2px solid transparent',
                    ...(activeId === item.id && {
                      borderLeftColor: 'primary.main',
                      bgcolor: 'action.selected'
                    })
                  }}
                >
                  <ListItemText 
                    primary={item.heading} 
                    primaryTypographyProps={{ 
                      variant: 'body2', 
                      color: activeId === item.id ? 'text.primary' : 'text.secondary',
                      fontWeight: activeId === item.id ? 600 : 400
                    }} 
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={4}>
            <Box>
              <Typography variant="h3" gutterBottom>
                Términos y Condiciones
              </Typography>
              <Typography color="text.secondary">
                Última actualización: Febrero 2026
              </Typography>
            </Box>
            
            {menuItems.map((item) => (
              <Box key={item.id} id={item.id} sx={{ scrollMarginTop: 100 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {item.heading}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {item.caption}
                </Typography>
                <Divider sx={{ mt: 4 }} />
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}
