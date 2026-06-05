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
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import FaqDetails from '@/components/faq/FaqDetails';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import useFocusWithin from '@/hooks/useFocusWithin';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FAQ - 8  ***************************/

/**
 *
 * Demos:
 * - [FAQ8](https://www.saasable.io/blocks/faq/faq8)
 *
 * API:
 * - [FAQ8 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/faq/faq8#props-details)
 */

export default function Faq8({ heading, caption, defaultExpanded, faqList, getInTouch }) {
  const theme = useTheme();
  const isFocusWithin = useFocusWithin();
  const [expanded, setExpanded] = useState(defaultExpanded || false);

  const cardRadius = { xs: 4, sm: 6 };
  const accordionRadius = { xs: cardRadius.xs * 4, sm: cardRadius.sm * 4 };
  const accordionPX = { xs: 2, sm: 2.5 };
  const iconProps = { color: 'text.primary' };

  // Handles the expansion of accordion panels
  const handleChange = (panel) => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 } }}>
        <Stack sx={{ gap: { xs: 1.5, sm: 3 } }}>
          <Stack direction={{ sm: 'row' }} sx={{ gap: 2, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'end' } }}>
            <Typeset {...{ heading, caption }} />
            <ButtonAnimationWrapper>
              <Button
                variant="contained"
                size="large"
                {...getInTouch.link}
                {...(getInTouch.link && getInTouch.link.href && { component: NextLink })}
              />
            </ButtonAnimationWrapper>
          </Stack>
          <Divider sx={{ borderColor: 'grey.400' }} />
        </Stack>
        <Grid
          container
          spacing={1.5}
          sx={{
            '& .MuiAccordion-root:first-of-type': { borderTopLeftRadius: accordionRadius, borderTopRightRadius: accordionRadius },
            '& .MuiAccordion-root:last-of-type': { borderBottomLeftRadius: accordionRadius, borderBottomRightRadius: accordionRadius }
          }}
        >
          {[faqList.slice(0, Math.ceil(faqList.length / 2)), faqList.slice(Math.ceil(faqList.length / 2))].map((list, colIndex) => (
            <Grid size={{ xs: 12, sm: 6 }} key={colIndex} sx={{ '& .MuiAccordion-root:last-of-type': { mb: 0 } }}>
              {list.map((item, index) => {
                const absoluteIndex = colIndex * Math.ceil(faqList.length / 2) + index;
                return (
                  <Accordion
                    key={index}
                    expanded={expanded === `panel${absoluteIndex}`}
                    onChange={handleChange(`panel${absoluteIndex}`)}
                    sx={{
                      borderRadius: cardRadius,
                      backgroundColor: 'grey.100',
                      mb: 1.5,
                      ...(isFocusWithin && { '&:focus-within': generateFocusVisibleStyles(theme.palette.primary.main) })
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <SvgIcon name={expanded === `panel${absoluteIndex}` ? 'tabler-minus' : 'tabler-plus'} {...iconProps} size={20} />
                      }
                      sx={{
                        p: accordionPX,
                        '& .MuiAccordionSummary-expandIconWrapper': { color: 'text.primary' },
                        '& .MuiAccordionSummary-content': { my: 0 },
                        '&.Mui-focusVisible': { bgcolor: 'transparent' },
                        '&:hover, &:hover svg': { color: 'primary.dark' }
                      }}
                    >
                      <Typography variant="h4">{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: accordionPX, pt: 0, pb: accordionPX }} key={absoluteIndex}>
                      <FaqDetails answer={item.answer} />
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Faq8.propTypes = {
  heading: PropTypes.any,
  caption: PropTypes.any,
  defaultExpanded: PropTypes.any,
  faqList: PropTypes.any,
  getInTouch: PropTypes.any
};
