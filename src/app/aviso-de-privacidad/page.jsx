
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
    id: 'responsable',
    heading: 'Identidad y Domicilio del Responsable',
    caption:
      'Capitalta S.A.P.I. de C.V., SOFOM, E.N.R. (en adelante "Capitalta"), con domicilio en Torre Cuarzo, Piso 33, Av. Paseo de la Reforma 26, Col. Juárez, Alcaldía Cuauhtémoc, CDMX, C.P. 06600, es responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:'
  },
  {
    id: 'finalidades',
    heading: 'Finalidades del Tratamiento',
    caption:
      'Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita: Verificar y confirmar su identidad; Evaluar su solicitud de crédito; Administrar y operar los servicios financieros contratados; Cumplimiento de obligaciones legales y regulatorias.'
  },
  {
    id: 'datos-personales',
    heading: 'Datos Personales Recabados',
    caption:
      'Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos los siguientes datos personales: Datos de identificación; Datos de contacto; Datos laborales; Datos patrimoniales y/o financieros.'
  },
  {
    id: 'transferencias',
    heading: 'Transferencia de Datos',
    caption:
      'Le informamos que sus datos personales son compartidos dentro y fuera del país con las siguientes personas, empresas, organizaciones y autoridades distintas a nosotros, para los siguientes fines: Autoridades financieras para cumplimiento normativo; Sociedades de información crediticia para historial crediticio.'
  },
  {
    id: 'derechos-arco',
    heading: 'Derechos ARCO',
    caption:
      'Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.'
  },
  {
    id: 'cambios',
    heading: 'Cambios al Aviso de Privacidad',
    caption:
      'El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad; de cambios en nuestro modelo de negocio, o por otras causas. Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad, a través de nuestro sitio web.'
  }
];

export default function AvisoPrivacidadPage() {
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
                Aviso de Privacidad
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
