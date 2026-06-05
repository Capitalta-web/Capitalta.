'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  BLOG - 7  ***************************/

/**
 *
 * Demos:
 * - [Blog7](https://www.saasable.io/blocks/blog/blog7)
 *
 * API:
 * - [Blog7 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/blog/blog7#props-details)
 */

export default function Blog7({ heading, blogs }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        {heading && <Typeset {...{ heading, stackProps: { sx: { textAlign: 'center' } } }} />}
        <Grid container spacing={1.5}>
          {blogs.map((item, index) => {
            return (
              <Grid key={index} size={{ xs: 12, sm: blogs.length % 2 !== 0 && index === blogs.length - 1 ? 12 : 6, md: 4 }}>
                <GraphicsCard sx={{ height: '100%', bgcolor: 'background.default', border: '1px solid', borderColor: 'grey.400' }}>
                  <GraphicsCard bgImage={item.image} sx={{ height: { xs: 240, md: 260 }, borderRadius: 0 }} />
                  <Stack sx={{ gap: { xs: 2.25, md: 3 }, alignItems: 'flex-start', padding: { xs: 2.5, sm: 3, md: 4 } }}>
                    <Stack sx={{ gap: 1.5 }}>
                      <Link
                        component={NextLink}
                        variant="h4"
                        sx={{ color: 'text.primary', '&:hover': { color: 'primary.dark' } }}
                        {...item.link}
                      >
                        {item.title}
                      </Link>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {item.caption}
                      </Typography>
                    </Stack>
                    <Link component={NextLink} color="primary.main" underline="hover" {...item.link} />
                  </Stack>
                </GraphicsCard>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Blog7.propTypes = { heading: PropTypes.any, blogs: PropTypes.any };
