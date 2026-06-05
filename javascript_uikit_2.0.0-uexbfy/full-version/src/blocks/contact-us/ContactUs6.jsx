'use client';
import PropTypes from 'prop-types';

import { useMemo } from 'react';

// @next
import dynamic from 'next/dynamic';
import NextLink from 'next/link';

// @mui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import { ContactUsForm1 } from '@/components/contact-us';
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });

/***************************  CONTACT US - CARD  ***************************/

function ContactCard({ title, content, link }) {
  return (
    <Stack sx={{ gap: 0.5 }}>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        {title}
      </Typography>
      <Link
        component={NextLink}
        variant="h5"
        color="text.primary"
        href={link ? link : ''}
        sx={{ '&:hover': { color: 'primary.dark' } }}
        rel="noopener noreferrer"
        aria-label="contact-content"
      >
        {content}
      </Link>
    </Stack>
  );
}

/***************************  CONTACT US - 6  ***************************/

/**
 *
 * Demos:
 * - [ContactUs6](https://www.Capitalta.io/blocks/contact-us/contact-us6)
 *
 * API:
 * - [ContactUs6 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/contact-us/contactus6#props-details)
 */

export default function ContactUs6({ heading, caption, contactDetails }) {
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
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Typeset
          {...{
            heading,
            caption,
            stackProps: { sx: { alignItems: 'center', textAlign: 'center' } },
            headingProps: { sx: { maxWidth: { xs: '85%', sm: '80%' } } },
            captionProps: { sx: { maxWidth: { xs: '75%', sm: '60%' } } }
          }}
        />
        <Grid container spacing={1.5} direction={{ xs: 'column-reverse', md: 'row' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack sx={{ gap: 1.5 }}>
              <Box
                sx={{
                  borderRadius: { xs: 6, sm: 8, md: 10 },
                  height: { xs: 194, sm: 267 },
                  overflow: 'hidden',
                  '.leaflet-top .leaflet-control': { mt: 2.5, ml: 2.5 }
                }}
              >
                {mapContainer}
              </Box>
              <GraphicsCard sx={{ p: { xs: 3, md: 5 } }}>
                <Grid container spacing={{ xs: 3, md: 4.25 }}>
                  <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                    <ContactCard title="Visit us" content={contactDetails.address} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                    <ContactCard title="Chat to sales" content={contactDetails.email} link={`mailto:${contactDetails.email}`} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                    <ContactCard title="Call us" content={contactDetails.phone} link={`tel:${contactDetails.phone}`} />
                  </Grid>
                  {contactDetails.time && (
                    <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                      <ContactCard title="Opening Hours" content={contactDetails.time} />
                    </Grid>
                  )}
                </Grid>
              </GraphicsCard>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <GraphicsCard sx={{ height: 1 }}>
              <Box sx={{ p: { xs: 2, sm: 4, md: 5 } }}>
                <ContactUsForm1 />
              </Box>
            </GraphicsCard>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

ContactCard.propTypes = { title: PropTypes.string, content: PropTypes.string, link: PropTypes.string };

ContactUs6.propTypes = { heading: PropTypes.any, caption: PropTypes.any, contactDetails: PropTypes.any };
