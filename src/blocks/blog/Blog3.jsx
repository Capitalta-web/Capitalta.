'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import { GraphicsCard } from '@/components/cards';
import GraphicsImage from '@/components/GraphicsImage';
import { ProfileCard2 } from '@/components/cards/profile-card';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  BLOG - 3  ***************************/

/**
 *
 * Demos:
 * - [Blog3](https://www.Capitalta.io/blocks/blog/blog3)
 *
 * API:
 * - [Blog3 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/blog/blog3#props-details)
 */

export default function Blog3({ heading, caption, blogs }) {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        {heading && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.4
            }}
          >
            <Typeset {...{ heading, caption }} />
          </motion.div>
        )}
        <Grid container spacing={1.5}>
          {blogs.map((item, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: item.animationDelay
                }}
              >
                <GraphicsCard>
                  <GraphicsCard>
                    <GraphicsImage image={item.image} sx={{ height: { xs: 250, md: 326 }, ...item.imagePosition }} />
                  </GraphicsCard>
                  <Box sx={{ padding: { xs: 2.5, sm: 3, md: 4 } }}>
                    <Stack sx={{ gap: 2.5, alignItems: 'flex-start' }}>
                      <Stack
                        direction="row"
                        sx={{
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          width: 1,
                          '&:hover .MuiLink-root, &:hover svg': { color: 'primary.dark' }
                        }}
                      >
                        <Link component={NextLink} role="button" variant="h3" color="text.primary" {...item.link}>
                          {item.caption}
                        </Link>
                        {item.link && (
                          <Link component={NextLink} role="button" {...item.link} rel="noopener noreferrer" aria-label="blog-link">
                            <SvgIcon name="tabler-arrow-up-right" size={downSM ? 32 : 40} color="text.primary" stroke={1} />
                          </Link>
                        )}
                      </Stack>
                      {item.title && (
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          {item.title}
                        </Typography>
                      )}
                      {item.profile && <ProfileCard2 {...item.profile} />}
                    </Stack>
                  </Box>
                </GraphicsCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Blog3.propTypes = { heading: PropTypes.any, caption: PropTypes.any, blogs: PropTypes.any };
