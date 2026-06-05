'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

const imageWidth = { xs: 130, sm: 222 };
const imageMinHeight = { xs: 138, md: 168, sm: 170 };

/***************************  BLOG - 9  ***************************/

export default function Blog9({ heading, caption, blogs, exploreMore }) {
  const ellipsis = { overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        {(heading || caption) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Stack
              direction={{ sm: 'row' }}
              sx={{ gap: { xs: 4, sm: 1 }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'flex-end' } }}
            >
              <Typeset {...{ heading, caption }} />
              {exploreMore && (
                <ButtonAnimationWrapper>
                  <Button variant="contained" size="large" {...exploreMore} {...(exploreMore.href && { component: NextLink })} />
                </ButtonAnimationWrapper>
              )}
            </Stack>
          </motion.div>
        )}
        {blogs.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Grid container spacing={1.5}>
              {blogs.map((item, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <GraphicsCard key={index} sx={{ p: { xs: 2, sm: 2.5 } }}>
                    <Stack direction="row" sx={{ gap: { xs: 2, sm: 2.5 } }}>
                      <GraphicsImage
                        image={item.image}
                        sx={{ width: imageWidth, height: imageMinHeight, flexShrink: 0, borderRadius: { xs: 3, md: 6, sm: 4 } }}
                      />
                      <Stack sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Stack sx={{ gap: { xs: 1, md: 1.5 } }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {item.date}
                          </Typography>
                          <Stack sx={{ gap: 1, alignItems: 'flex-start' }}>
                            <Link
                              variant="h4"
                              component={item.link?.href ? NextLink : Typography}
                              sx={{
                                ...ellipsis,
                                WebkitLineClamp: 1,
                                color: 'text.primary',
                                ...(item.link?.href && { '&:hover': { color: 'primary.dark' } })
                              }}
                              {...(item.link?.href && { ...item.link })}
                            >
                              {item.title}
                            </Link>
                            <Typography variant="body1" sx={{ ...ellipsis, WebkitLineClamp: 2, color: 'text.secondary' }}>
                              {item.caption}
                            </Typography>
                          </Stack>
                        </Stack>
                        {item.link?.href && <Link component={NextLink} variant="caption2" underline="hover" {...item.link} />}
                      </Stack>
                    </Stack>
                  </GraphicsCard>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}
      </Stack>
    </ContainerWrapper>
  );
}

Blog9.propTypes = { heading: PropTypes.any, caption: PropTypes.any, blogs: PropTypes.any, exploreMore: PropTypes.any };
