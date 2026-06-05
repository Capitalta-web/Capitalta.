'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

// @third-party
import axios from 'axios';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import { SECTION_COMMON_PY } from '@/utils/constant';

export default function BlogDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articulos/${slug}`);
        setArticle(response.data.article);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('No se pudo cargar el artículo.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
        <Container maxWidth="md">
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4, mb: 4 }} />
          <Skeleton variant="text" height={60} width="80%" />
          <Skeleton variant="text" height={30} width="40%" sx={{ mb: 4 }} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} width="90%" />
        </Container>
      </ContainerWrapper>
    );
  }

  if (error || !article) {
    return (
      <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="error" gutterBottom>
            {error || 'Artículo no encontrado'}
          </Typography>
          <Button variant="contained" onClick={() => router.push('/blog')}>
            Volver al Blog
          </Button>
        </Box>
      </ContainerWrapper>
    );
  }

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', pt: { xs: 4, md: 8 }, pb: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid size={{ xs: 12, md: 10 }}>
              <Stack spacing={3} alignItems="center" textAlign="center">
                {article.category && (
                  <Chip label={article.category.replace('_', ' ')} color="primary" sx={{ textTransform: 'capitalize', fontWeight: 600 }} />
                )}
                <Typography variant="h2" component="h1" sx={{ fontWeight: 800 }}>
                  {article.title}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body1" color="text.secondary">
                    {new Date(article.published_at).toLocaleDateString('es-MX', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                  {/* Add author info if available */}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: -6, mb: 8, position: 'relative', zIndex: 2 }}>
        <GraphicsCard
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: (theme) => theme.customShadows.z16,
            mb: 6
          }}
        >
          <Box
            component="img"
            src={article.image_url || 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80'}
            alt={article.title}
            sx={{ width: '100%', height: 'auto', display: 'block', maxHeight: 600, objectFit: 'cover' }}
          />
        </GraphicsCard>

        <Box sx={{ typography: 'body1', fontSize: '1.125rem', lineHeight: 1.8, color: 'text.primary' }}>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </Box>

        <Divider sx={{ my: 6 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            ¿Te interesó este tema?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Suscríbete a nuestro newsletter para recibir más contenido como este.
          </Typography>
          <Button variant="contained" size="large" onClick={() => router.push('/contacto')}>
            Contactar a un experto
          </Button>
        </Box>
      </Container>
    </>
  );
}
