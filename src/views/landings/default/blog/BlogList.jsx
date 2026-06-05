'use client';

import { useState, useEffect } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

// @third-party
import axios from 'axios';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SectionHero from '@/components/SectionHero';
import { SECTION_COMMON_PY } from '@/utils/constant';

export default function BlogList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/articulos');
        setArticles(response.data.data || []);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('No se pudieron cargar los artículos. Por favor intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <SectionHero
        heading="Blog Capitalta"
        caption="Descubre estrategias financieras, noticias y consejos para impulsar tu negocio."
        search={false}
      />
      <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid key={item} size={{ xs: 12, md: 4 }}>
                <Skeleton variant="rectangular" height={260} sx={{ borderRadius: 2, mb: 2 }} />
                <Skeleton variant="text" height={32} width="80%" />
                <Skeleton variant="text" height={20} width="60%" />
              </Grid>
            ))}
          </Grid>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="error">
              {error}
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </Box>
        ) : articles.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5">Aún no hay artículos publicados.</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {articles.map((item, index) => (
              <Grid key={item.id || index} size={{ xs: 12, md: 4 }}>
                <GraphicsCard
                  sx={{
                    height: '100%',
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: (theme) => theme.shadows[4],
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden', height: 240 }}>
                    <GraphicsCard
                      bgImage={item.image_url || 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80'}
                      sx={{ height: '100%', borderRadius: 0 }}
                    />
                    {item.category && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          bgcolor: 'primary.main',
                          color: 'common.white',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          typography: 'subtitle2',
                          textTransform: 'capitalize'
                        }}
                      >
                        {item.category.replace('_', ' ')}
                      </Box>
                    )}
                  </Box>

                  <Stack sx={{ p: 3, gap: 2, flexGrow: 1 }}>
                    <Stack sx={{ gap: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {item.published_at ? new Date(item.published_at).toLocaleDateString('es-MX', { dateStyle: 'long' }) : 'Reciente'}
                      </Typography>
                      <Link
                        component={NextLink}
                        href={`/blog/${item.slug}`}
                        variant="h5"
                        color="text.primary"
                        underline="none"
                        sx={{
                          fontWeight: 700,
                          '&:hover': { color: 'primary.main' },
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {item.title}
                      </Link>
                    </Stack>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {item.excerpt}
                    </Typography>

                    <Box sx={{ mt: 'auto', pt: 2 }}>
                      <Button component={NextLink} href={`/blog/${item.slug}`} endIcon={<i className="tabler-arrow-right" />}>
                        Leer más
                      </Button>
                    </Box>
                  </Stack>
                </GraphicsCard>
              </Grid>
            ))}
          </Grid>
        )}
      </ContainerWrapper>
    </>
  );
}
