import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { GraphicsCard } from '@/components/cards';
import { ProfileCard2 } from '@/components/cards/profile-card';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  BLOG - 10  ***************************/

export default function Blog10({ headLine, captionLine, blogs, blog }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        {headLine && <Typeset heading={headLine} caption={captionLine} stackProps={{ sx: { textAlign: 'center' } }} />}
        <Stack sx={{ gap: 1.5 }}>
          <GraphicsCard sx={{ p: { xs: 2.5, sm: 3, md: 4 }, height: 1 }}>
            <Grid container direction={{ xs: 'column-reverse', md: 'row' }} spacing={1.5}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack sx={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: { xs: 2.5, sm: 3, md: 5 }, height: 1 }}>
                  <Stack sx={{ gap: { xs: 2.5, sm: 3, md: 5 } }}>
                    {blog?.profile && <ProfileCard2 {...blog.profile} />}
                    <Stack sx={{ gap: 2.25 }}>
                      {blog.chips && (
                        <Typography color="primary.main" component="p" variant="h6" sx={{ fontWeight: 500 }}>
                          {blog.chips.join(' | ')}
                        </Typography>
                      )}

                      <Typeset
                        heading={blog.caption}
                        caption={blog.date}
                        stackProps={{ sx: { gap: 1.75 } }}
                        headingProps={{ variant: 'h3' }}
                        captionProps={{ variant: 'body1' }}
                      />
                    </Stack>
                  </Stack>
                  {blog?.link && (
                    <Button
                      variant="contained"
                      component={Link}
                      role="button"
                      href={blog?.link?.href}
                      rel="noopener noreferrer"
                      aria-label="blog-link"
                    >
                      {blog?.link?.children || 'Read More'}
                    </Button>
                  )}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <GraphicsCard>
                  <GraphicsImage image={blog.image} sx={{ height: { xs: 200, md: 400, sm: 360 }, width: 1, ...blog?.imagePosition }} />
                </GraphicsCard>
              </Grid>
            </Grid>
          </GraphicsCard>

          <Grid container spacing={1.5}>
            {blogs.map((blog, index) => (
              <Grid
                key={index}
                size={{ xs: 12, sm: blogs.length - 1 > index || (blogs.length - 1 === index && index % 2 !== 0) ? 6 : 12, md: 4 }}
              >
                <GraphicsCard sx={{ p: { xs: 2, sm: 2.25, md: 2.5 }, pb: { xs: 2.5, sm: 3, md: 4 }, height: 1 }}>
                  <Stack sx={{ gap: 2.5 }}>
                    <GraphicsImage
                      image={blog.image}
                      sx={{ height: { xs: 250, md: 260 }, width: 1, borderRadius: 8, ...blog?.imagePosition }}
                    />
                    <Stack sx={{ gap: 2.5 }}>
                      {blog.chips && (
                        <Typography variant="subtitle1" color="primary.main">
                          {blog.chips.join(' | ')}
                        </Typography>
                      )}

                      <Typeset
                        heading={blog.caption}
                        caption={blog.date}
                        stackProps={{ sx: { gap: 1.5 } }}
                        headingProps={{ variant: 'h4' }}
                        captionProps={{ variant: 'body1' }}
                      />
                    </Stack>
                  </Stack>
                </GraphicsCard>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}

Blog10.propTypes = { headLine: PropTypes.string, captionLine: PropTypes.string, blogs: PropTypes.array, blog: PropTypes.any };
