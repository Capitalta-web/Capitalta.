'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import useFocusWithin from '@/hooks/useFocusWithin';
import { SECTION_COMMON_PY } from '@/utils/constant';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';

const ellipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical'
};

/***************************  BLOG - CARD  ***************************/

function BlogCard({ caption, image, imagePosition, date, link }) {
  const imageSize = { xs: 116, sm: 168, md: 174 };

  return (
    <GraphicsCard sx={{ minHeight: imageSize, height: 1 }}>
      <Stack direction="row" sx={{ height: 1 }}>
        <GraphicsCard bgImage={image} sx={{ minWidth: imageSize, height: 1, ...imagePosition }} />
        <Stack sx={{ p: { xs: 2, md: 3 }, gap: { xs: 1.5, sm: 4, md: 5 }, justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {date}
          </Typography>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 1.5,
              '&:hover .MuiLink-root, &:hover svg': { color: 'primary.dark' }
            }}
          >
            <Link component={NextLink} variant="h4" color="text.primary" sx={{ ...ellipsis }} {...link}>
              {caption}
            </Link>
            {link && (
              <Link component={NextLink} {...link} rel="noopener noreferrer" aria-label="blog-link">
                <SvgIcon name="tabler-arrow-up-right" size={24} color="text.primary" />
              </Link>
            )}
          </Stack>
        </Stack>
      </Stack>
    </GraphicsCard>
  );
}

/***************************  BLOG - 5  ***************************/

/**
 *
 * Demos:
 * - [Blog5](https://www.saasable.io/blocks/blog/blog5)
 *
 * API:
 * - [Blog5 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/blog/blog5#props-details)
 */

export default function Blog5({ heading, caption, viewMore, blogs }) {
  const isFocusWithin = useFocusWithin();

  const LinkSection = () => {
    const theme = useTheme();

    return (
      <GraphicsCard
        sx={{
          height: { xs: 72, md: 1 },
          ...(isFocusWithin && { '&:focus-within': generateFocusVisibleStyles(theme.vars.palette.primary.main) })
        }}
      >
        <Button
          fullWidth
          endIcon={<SvgIcon name="tabler-arrow-narrow-right" size={40} stroke={1} />}
          {...(viewMore.href && { component: NextLink })}
          {...viewMore}
          sx={{ typography: 'h5', height: 1, borderRadius: 0, ...viewMore.sx }}
        />
      </GraphicsCard>
    );
  };

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
            <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />
          </motion.div>
        )}
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 5 }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.5
              }}
            >
              <GraphicsCard>
                <GraphicsCard bgImage={blogs[0].image} sx={{ height: { xs: 234, sm: 208, md: 326 }, ...blogs[0].imagePosition }} />
                <Stack sx={{ p: { xs: 2.5, sm: 3, md: 4 }, gap: 1.5, alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {blogs[0].date}
                  </Typography>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      width: 1,
                      '&:hover .MuiLink-root, &:hover svg': { color: 'primary.dark' }
                    }}
                  >
                    <Link component={NextLink} variant="h3" color="text.primary" sx={{ ...ellipsis }} {...blogs[0].link}>
                      {blogs[0].caption}
                    </Link>
                    {blogs[0].link && (
                      <Link
                        component={NextLink}
                        {...blogs[0].link}
                        rel="noopener noreferrer"
                        aria-label="blog-link"
                        sx={{
                          ...blogs[0].link.sx,
                          '& svg.tabler-arrow-up-right': {
                            width: { xs: 24, sm: 40 },
                            height: { xs: 24, sm: 40 },
                            strokeWidth: { sm: 1 }
                          }
                        }}
                      >
                        <SvgIcon name="tabler-arrow-up-right" color="text.primary" />
                      </Link>
                    )}
                  </Stack>
                </Stack>
              </GraphicsCard>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, sm: 7 }}>
            <Stack sx={{ gap: 1.5, height: 1 }}>
              {blogs[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6
                  }}
                  style={{ height: '100%' }}
                >
                  <BlogCard {...blogs[1]} />
                </motion.div>
              )}
              {blogs[2] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.7
                  }}
                  style={{ height: '100%' }}
                >
                  <BlogCard {...blogs[2]} />
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.7
                }}
                style={{ height: '100%' }}
              >
                <Box sx={{ height: 1, display: { xs: 'none', md: 'block' } }}>
                  <LinkSection />
                </Box>
              </motion.div>
            </Stack>
          </Grid>

          {/* Link Card */}
          <Grid sx={{ display: { xs: 'block', md: 'none' } }} size={12}>
            <LinkSection />
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

BlogCard.propTypes = {
  caption: PropTypes.any,
  image: PropTypes.any,
  imagePosition: PropTypes.any,
  date: PropTypes.any,
  link: PropTypes.any
};

Blog5.propTypes = { heading: PropTypes.any, caption: PropTypes.any, viewMore: PropTypes.any, blogs: PropTypes.any };
