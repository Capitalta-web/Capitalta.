'use client';
import PropTypes from 'prop-types';

import { useMemo } from 'react';

// @next
import dynamic from 'next/dynamic';

// @mui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard, IconCard } from '@/components/cards';
import { ContactUsForm1 } from '@/components/contact-us';
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });

/***************************  CONTACT US - CARD  ***************************/

function ContactCard({ icon, title, content, link }) {
  return (
    <IconCard
      icon={{
        ...(typeof icon === 'string' ? { name: icon } : { ...icon }),
        stroke: 1,
        color: 'inherit'
      }}
      title={title}
      content={content}
      contentCard
      cardPadding={{ xs: 2, md: 5 }}
      titleProps={{ variant: 'body1', color: 'text.secondary', order: 2 }}
      contentProps={{
        variant: 'h4',
        color: 'text.primary',
        component: link ? Link : Typography,
        ...(link && { href: link, sx: { '&:hover': { color: 'primary.dark' } } })
      }}
    />
  );
}

/***************************  CONTACT US - 5  ***************************/

/**
 *
 * Demos:
 * - [ContactUs5](https://www.Capitalta.io/blocks/contact-us/contact-us5)
 *
 * API:
 * - [ContactUs5 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/contact-us/contactus5#props-details)
 */

export default function ContactUs5({ heading, caption, contactDetails }) {
  const time = useMemo(() => new Date().getTime(), []);

  const mapContainer = useMemo(() => {
    return (
      <MapContainer key={time} center={[21.233867, 72.862775]} zoom={15} style={{ height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={1.5}>
        <Grid size={12}>
          <Grid container spacing={{ xs: 3, sm: 4, md: 3 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typeset {...{ heading, caption }} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <GraphicsCard sx={{ height: 1 }}>
                <Box sx={{ p: { xs: 2, sm: 4, md: 5 } }}>
                  <ContactUsForm1 />
                </Box>
              </GraphicsCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Box
            sx={{
              borderRadius: { xs: 6, sm: 8, md: 10 },
              overflow: 'hidden',
              height: { xs: 255, sm: 267, md: 308 },
              '.leaflet-top .leaflet-control': { mt: 2.5, ml: 2.5 }
            }}
          >
            {mapContainer}
          </Box>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <ContactCard icon="tabler-map-pin" title="Visit us" content={contactDetails.address} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <ContactCard icon="tabler-phone" title="Call us" content={contactDetails.phone} link={`tel:${contactDetails.phone}`} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <ContactCard
                icon="tabler-mail"
                title="Chat to sales"
                content={contactDetails.email}
                link={`mailto:${contactDetails.email}`}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

ContactCard.propTypes = { icon: PropTypes.any, title: PropTypes.any, content: PropTypes.any, link: PropTypes.any };

ContactUs5.propTypes = { heading: PropTypes.any, caption: PropTypes.any, contactDetails: PropTypes.any };
