'use client';
import PropTypes from 'prop-types';

import { useEffect, useRef } from 'react';

// @mui
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import GetImagePath from '@/utils/GetImagePath';
import Typeset from '@/components/Typeset';

// @assets
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandWhatsapp, IconBrandTiktok } from '@tabler/icons-react';

/***************************  HERO - 16  ***************************/

/**
 *
 * Demos:
 * - [Hero16](https://www.Capitalta.io/blocks/hero/hero16)
 *
 * API:
 * - [Hero16 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/hero/hero16#props-details)
 */

export default function Hero16({ heading, caption, secondaryBtn, poster, videoSrc }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = true; // Ensure video is muted for autoplay
      videoElement.play().catch((error) => console.error('Autoplay prevented:', error));
    }
  }, []);

  return (
    <Stack sx={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Background Video */}
      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted
        loop
        poster={GetImagePath(poster)}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: 0
        }}
      >
        <source src={GetImagePath(videoSrc)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Overlay Dark */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for text readability
          zIndex: 1
        }}
      />

      {/* Content Overlay */}
      <ContainerWrapper sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', py: { xs: 4, md: 8 } }}>
        
        {/* Top Left Content */}
        <Stack sx={{ maxWidth: { xs: '100%', md: '700px' }, mt: { xs: 8, md: 12 }, gap: 2 }}>
          <Typeset
            heading="Capitalta"
            caption="Tu crecimiento no se detiene, Nuestro apoyo tampoco..."
            headingProps={{ 
              variant: 'h1', 
              sx: { color: 'common.white', fontSize: { xs: '3rem', md: '5rem' }, fontWeight: 700, mb: 1 } 
            }}
            captionProps={{ 
              variant: 'h2', 
              sx: { color: 'common.white', fontSize: { xs: '1.5rem', md: '2.5rem' }, fontWeight: 500, lineHeight: 1.2 } 
            }}
          />
          <Typeset
            caption="Soluciones financieras ágiles y flexibles para personas y negocios en México."
            captionProps={{ 
              variant: 'h3', 
              sx: { color: 'common.white', fontSize: { xs: '1.1rem', md: '1.5rem' }, fontWeight: 400, opacity: 0.9, mt: 2 } 
            }}
          />

          {/* Social Icons */}
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            {[
              { icon: IconBrandTiktok, href: 'https://www.tiktok.com/@capitalta_?_r=1&_t=ZS-93cuVnZL9BI', label: 'TikTok' },
              { icon: IconBrandInstagram, href: 'https://www.instagram.com/capitaltamx/', label: 'Instagram' },
              { icon: IconBrandFacebook, href: 'https://www.facebook.com/capitaltamx/', label: 'Facebook' },
              { icon: IconBrandLinkedin, href: 'https://linkedin.com/company/capitalta', label: 'LinkedIn' },
              { icon: IconBrandWhatsapp, href: 'https://wa.me/525652016445', label: 'WhatsApp' }
            ].map((social, index) => (
              <IconButton
                key={index}
                component="a"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                sx={{
                  color: 'common.white',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)', // Safari support
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <social.icon size={24} stroke={1.5} />
              </IconButton>
            ))}
          </Stack>
        </Stack>

      </ContainerWrapper>
    </Stack>
  );
}

Hero16.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  secondaryBtn: PropTypes.any,
  poster: PropTypes.any,
  videoSrc: PropTypes.string
};
