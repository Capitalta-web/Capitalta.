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
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import Rating from '@/components/Rating';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';
import GetImagePath from '@/utils/GetImagePath';

/***************************  OTHER 3 - CATEGORY BUTTON  ***************************/

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

/***************************  OTHER - 3  ***************************/

export default function Other3({ heading, caption, exploreMore, categories, items }) {
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
                    sx={{ minWidth: 215, textTransform: 'none' }}
                  />
                </ButtonAnimationWrapper>
              )}
            </Stack>
          </motion.div>
        )}

        <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
          {categories && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Stack sx={slickStyle}>
                <Slider {...sliderSettings}>
                  {categories?.map((item, index) => (
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
          )}

          {items.length && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Grid container spacing={1.5}>
                {items
                  .filter((item) => activeTopic === '' || item.categories?.includes(activeTopic))
                  .map((item, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                      <GraphicsCard sx={{ borderRadius: 8, p: 2 }}>
                        {item.image && <GraphicsImage image={item.image} sx={{ height: 260, borderRadius: 6 }} />}
                        <Stack sx={{ mt: 4, gap: 2.5 }}>
                          <Stack sx={{ gap: 2 }}>
                            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                              <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                                <Rating rate={item.rating} starSize={16} />
                                <Typography variant="body2" color="text.secondary">
                                  {item.rating}/5
                                </Typography>
                              </Stack>
                              <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center' }}>
                                <SvgIcon name="tabler-calendar" size={16} color="text.secondary" />
                                <Typography color="text.secondary">{item.date}</Typography>
                              </Stack>
                            </Stack>
                            <Stack sx={{ gap: 1 }}>
                              <Typography variant="h4">{item.title}</Typography>
                              {item.avatar && (
                                <Stack direction="row" sx={{ gap: 0.75, alignItems: 'center' }}>
                                  <Avatar
                                    src={GetImagePath(item.avatar)}
                                    sx={{ width: 24, height: 24, bgcolor: 'grey.600' }}
                                    alt="Author Avatar"
                                  />
                                  <Typography color="text.secondary">{item.caption}</Typography>
                                </Stack>
                              )}
                            </Stack>
                          </Stack>

                          <Stack direction="row" sx={{ justifyContent: 'space-between', color: 'text.secondary' }}>
                            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                              <SvgIcon name="tabler-brand-youtube" size={16} color="text.secondary" />
                              <Typography>{item.views} Lessons</Typography>
                            </Stack>

                            <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
                              <SvgIcon name="tabler-history" size={16} color="text.secondary" />
                              <Typography>{item.comments} Messages</Typography>
                            </Stack>
                          </Stack>
                          <Divider sx={{ borderStyle: 'dashed' }} />
                          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h5">${item.amount}</Typography>
                            <Button
                              component={NextLink}
                              href={item.href ?? '#'}
                              variant="outlined"
                              size="small"
                              sx={{ width: 'fit-content' }}
                            >
                              Read More
                            </Button>
                          </Stack>
                        </Stack>
                      </GraphicsCard>
                    </Grid>
                  ))}
              </Grid>
            </motion.div>
          )}
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}

CategoryButton.propTypes = { label: PropTypes.string, isActive: PropTypes.bool, onClick: PropTypes.func };

Other3.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  exploreMore: PropTypes.any,
  categories: PropTypes.array,
  items: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array])
};
