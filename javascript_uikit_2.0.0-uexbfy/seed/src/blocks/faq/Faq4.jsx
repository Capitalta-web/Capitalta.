'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import FaqDetails from '@/components/faq/FaqDetails';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import useFocusWithin from '@/hooks/useFocusWithin';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FAQ - 4  ***************************/

/**
 *
 * Demos:
 * - [FAQ4](https://www.saasable.io/blocks/faq/faq4)
 *
 * API:
 * - [FAQ4 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/faq/faq4#props-details)
 */

export default function Faq4({ heading, caption, defaultExpanded, faqList, getInTouch }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded || false);

  const cardRadius = { xs: 4, md: 6 };
  const accordionRadius = { xs: cardRadius.xs * 4, md: cardRadius.md * 4 };
  const accordionPX = { xs: 1.5, sm: 2, md: 3 };
  const iconProps = { color: 'text.primary' };

  // Handles the expansion of accordion panels
  const handleChange = (panel) => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  const isFocusWithin = useFocusWithin();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: 0.4
        }}
      >
        <GraphicsCard>
          <Stack sx={{ py: { xs: 1.5, sm: 4, md: 5 }, px: { xs: 1.5, sm: 4, md: 12 }, gap: { xs: 3, sm: 4 } }}>
            <Typeset
              {...{
                heading,
                caption,
                stackProps: { sx: { alignItems: 'center', textAlign: 'center' } },
                captionProps: { sx: { maxWidth: 650 } }
              }}
            />
            <Stack
              sx={{
                gap: 1.5,
                '& .MuiAccordion-root:first-of-type': { borderTopLeftRadius: accordionRadius, borderTopRightRadius: accordionRadius }
              }}
            >
              {faqList.map((item, index) => (
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                  sx={{
                    borderRadius: cardRadius,
                    backgroundColor: 'grey.300',
                    ...(isFocusWithin && { '&:focus-within': generateFocusVisibleStyles(theme.vars.palette.primary.main) })
                  }}
                >
                  <AccordionSummary
                    expandIcon={<SvgIcon name={expanded === `panel${index}` ? 'tabler-minus' : 'tabler-plus'} {...iconProps} size={20} />}
                    sx={{
                      p: accordionPX,
                      '&.Mui-focusVisible': { bgcolor: 'transparent' },
                      '&:hover, &:hover svg': { color: 'primary.dark' }
                    }}
                    slotProps={{ content: { sx: { my: 0 } } }}
                  >
                    <Typography variant="h4">{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: accordionPX, pb: accordionPX, pt: 0 }}>
                    <FaqDetails answer={item.answer} />
                  </AccordionDetails>
                </Accordion>
              ))}
              <Stack
                direction={{ sm: 'row' }}
                sx={{
                  justifyContent: 'space-between',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  p: accordionPX,
                  gap: 1.5,
                  borderRadius: { xs: 4, md: 6 },
                  backgroundColor: 'grey.300'
                }}
              >
                <Typeset
                  {...{
                    heading: getInTouch.title,
                    caption: getInTouch.description,
                    headingProps: { variant: 'h4' },
                    captionProps: { variant: 'body1' }
                  }}
                />
                <ButtonAnimationWrapper>
                  <Button
                    variant="contained"
                    size="large"
                    {...getInTouch.link}
                    {...(getInTouch.link && getInTouch.link.href && { component: NextLink })}
                    sx={{ minWidth: 215, ...getInTouch.link.sx }}
                  />
                </ButtonAnimationWrapper>
              </Stack>
            </Stack>
          </Stack>
        </GraphicsCard>
      </motion.div>
    </ContainerWrapper>
  );
}

Faq4.propTypes = {
  heading: PropTypes.any,
  caption: PropTypes.any,
  defaultExpanded: PropTypes.any,
  faqList: PropTypes.any,
  getInTouch: PropTypes.any
};
