'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';
import Slider from 'react-slick';

// @project
import { Cta1 } from '@/blocks/cta';
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { SECTION_COMMON_PY } from '@/utils/constant';
import GetImagePath from '@/utils/GetImagePath';

/***************************  BLOG 8 - CATEGORY BUTTON  ***************************/

function CategoryButton({ label, isActive, onClick }) {
  return (
    <Button
      sx={{
        color: 'text.primary',
        borderColor: 'divider',
        bgcolor: isActive ? 'grey.100' : 'inherit',
        '&:hover': { bgcolor: 'grey.100', borderColor: 'divider' }
      }}
      variant="outlined"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

const allCategory = { label: 'All Categories', value: '' };

/***************************  BLOG - 8  ***************************/

export default function Blog8({ heading, caption, exploreMore, categories, blogs }) {
  const [activeTopic, setActiveTopic] = useState('');

  const slickStyle = {
    '& .slick-slide': {
      '> div': { px: { xs: 0.5, md: 0.75 }, py: 0.5 }
    }
  };

  const sliderSettings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    swipeToSlide: true,
    initialSlide: 0,
    variableWidth: true
  };

  const valueToLabelMap = Object.fromEntries(categories.map((cat) => [cat.value, cat.label]));
  const filteredBlogs = blogs.filter((blog) => activeTopic === '' || blog.categories.includes(activeTopic));

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
            <Stack direction={{ sm: 'row' }} sx={{ gap: 4, justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Typeset {...{ heading, caption }} />
              {exploreMore && (
                <ButtonAnimationWrapper>
                  <Button
                    variant="contained"
                    size="large"
                    {...exploreMore}
                    {...(exploreMore.href && { component: NextLink })}
                    sx={{ minWidth: 215 }}
                  />
                </ButtonAnimationWrapper>
              )}
            </Stack>
          </motion.div>
        )}

        <Stack sx={{ gap: { xs: 2, sm: 2.5 } }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Stack sx={slickStyle}>
              <Slider {...sliderSettings}>
                {[allCategory, ...categories].map((item, index) => (
                  <CategoryButton
                    key={index}
                    label={item.label}
                    isActive={activeTopic === item.value}
                    onClick={() => setActiveTopic(item.value)}
                  />
                ))}
              </Slider>
            </Stack>
          </motion.div>

          {blogs.length && (
            <Grid container spacing={1.5}>
              {filteredBlogs.length === 0 ? (
                <Grid size={12}>
                  <Cta1
                    {...{
                      bgImage: '/assets/images/graphics/ai/background1.svg',
                      heading: 'No blog found',
                      caption: 'Try to selecting a different category.'
                    }}
                  />
                </Grid>
              ) : (
                filteredBlogs.map((blog, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <GraphicsCard sx={{ borderRadius: 8, p: 2 }}>
                        {blog.image && <GraphicsImage image={blog.image} sx={{ height: 260, borderRadius: 6 }} />}
                        <Stack sx={{ mt: 4, gap: 2.5 }}>
                          <Stack sx={{ gap: 2 }}>
                            <Stack direction="row" sx={{ justifyContent: 'space-between', color: 'grey.800' }}>
                              <Typography color="text.secondary">
                                {blog.categories
                                  .map((category) => valueToLabelMap[category])
                                  .filter(Boolean) // filter out any undefined values just in case
                                  .join(' | ')}
                              </Typography>
                              <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center' }}>
                                <SvgIcon name="tabler-calendar" size={16} color="text.secondary" />
                                <Typography color="text.secondary">{blog.date}</Typography>
                              </Stack>
                            </Stack>
                            <Stack sx={{ gap: 1 }}>
                              <Typography variant="h4">{blog.title}</Typography>
                              {blog.avatar && (
                                <Stack direction="row" sx={{ gap: 0.75, alignItems: 'center' }}>
                                  <Avatar
                                    src={GetImagePath(blog.avatar)}
                                    sx={{ width: 24, height: 24, bgcolor: 'grey.600' }}
                                    alt="Author Avatar"
                                  />
                                  <Typography color="text.secondary">{blog.caption}</Typography>
                                </Stack>
                              )}
                            </Stack>
                          </Stack>

                          <Stack direction="row" sx={{ justifyContent: 'space-between', color: 'text.secondary' }}>
                            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                              <SvgIcon name="tabler-eye" size={16} color="text.secondary" />
                              <Typography>{blog.views} Views</Typography>
                            </Stack>

                            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                              <SvgIcon name="tabler-message-circle" size={16} color="text.secondary" />
                              <Typography>{blog.comments} Messages</Typography>
                            </Stack>
                          </Stack>
                          <Divider sx={{ borderStyle: 'dashed' }} />
                          <Button href={blog.href} variant="outlined" size="small" sx={{ width: 'fit-content' }}>
                            Read More
                          </Button>
                        </Stack>
                      </GraphicsCard>
                    </motion.div>
                  </Grid>
                ))
              )}
            </Grid>
          )}
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}

CategoryButton.propTypes = { label: PropTypes.string, isActive: PropTypes.bool, onClick: PropTypes.func };

Blog8.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  exploreMore: PropTypes.any,
  categories: PropTypes.array,
  blogs: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array])
};
