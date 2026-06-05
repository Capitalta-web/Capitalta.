'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import FaqDetails from '@/components/faq/FaqDetails';
import { GraphicsCard } from '@/components/cards';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import useFocusWithin from '@/hooks/useFocusWithin';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FAQ - 5  ***************************/

/**
 *
 * Demos:
 * - [FAQ5](https://www.saasable.io/blocks/faq/faq5)
 *
 * API:
 * - [FAQ5 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/faq/faq5#props-details)
 */

export default function Faq5({ heading, caption, defaultExpanded, faqList, image, getInTouch }) {
  const [expanded, setExpanded] = useState(defaultExpanded || false);

  const cardRadius = { xs: 6, sm: 8, md: 10 };
  const accordionRadius = { xs: cardRadius.xs * 4, md: cardRadius.md * 4 };
  const accordionPX = { xs: 2, sm: 2, md: 3 };
  const iconProps = { color: 'text.primary' };

  // Handles the expansion of accordion panels
  const handleChange = (panel) => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  const isFocusWithin = useFocusWithin();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Typeset {...{ heading, caption }} />
        <Grid container spacing={1.5}>
          {image && (
            <Grid size={{ xs: 12, sm: 5, md: 6 }}>
              <GraphicsCard sx={{ height: { xs: 320, sm: 1 }, p: { xs: 3, sm: 4, md: 5 } }}>
                <GraphicsImage {...{ image }} sx={{ height: 1, backgroundSize: 'contain' }} />
              </GraphicsCard>
            </Grid>
          )}
          <Grid size={{ xs: 12, sm: 7, md: 6 }}>
            <GraphicsCard sx={{ borderRadius: cardRadius }}>
              <Stack
                sx={{
                  '& .MuiAccordion-root:first-of-type': { borderTopLeftRadius: accordionRadius, borderTopRightRadius: accordionRadius }
                }}
              >
                {faqList.map((item, index) => (
                  <Accordion
                    key={index}
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                    sx={{
                      backgroundColor: 'grey.100',
                      px: accordionPX,
                      '&:before': { mx: accordionPX, display: 'block', backgroundColor: 'grey.300' },
                      '&.Mui-expanded::before': { opacity: 1 },
                      ...(isFocusWithin && {
                        '&:focus-within': { bgcolor: 'grey.200' }
                      })
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<SvgIcon name={expanded === `panel${index}` ? 'tabler-minus' : 'tabler-plus'} {...iconProps} size={20} />}
                      sx={{
                        px: 0,
                        py: accordionPX,
                        '&.Mui-focusVisible': { bgcolor: 'transparent' },
                        '&:hover, &:hover svg': { color: 'primary.dark' }
                      }}
                      slotProps={{ content: { sx: { my: 0 } } }}
                    >
                      <Typography variant="subtitle1">{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ '& .MuiTypography-root': { fontSize: { xs: 12, md: 14 } }, px: 0, pb: accordionPX, pt: 0 }}>
                      <FaqDetails answer={item.answer} />
                    </AccordionDetails>
                    {index < faqList.length - 1 && <Divider />}
                  </Accordion>
                ))}
              </Stack>
            </GraphicsCard>
          </Grid>
          <Grid size={12}>
            <GraphicsCard>
              <Stack
                direction={{ sm: 'row' }}
                sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, p: accordionPX, gap: 1.5 }}
              >
                <Typeset
                  {...{
                    heading: getInTouch.title,
                    caption: getInTouch.description,
                    headingProps: { variant: 'h4' },
                    captionProps: { variant: 'body1' }
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  {...getInTouch.link}
                  {...(getInTouch.link && getInTouch.link.href && { component: NextLink })}
                  sx={{ minWidth: 215, ...getInTouch.link.sx }}
                />
              </Stack>
            </GraphicsCard>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Faq5.propTypes = {
  heading: PropTypes.any,
  caption: PropTypes.any,
  defaultExpanded: PropTypes.any,
  faqList: PropTypes.any,
  image: PropTypes.any,
  getInTouch: PropTypes.any
};
