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
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import FaqDetails from '@/components/faq/FaqDetails';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import useFocusWithin from '@/hooks/useFocusWithin';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  In Touch Card  ************************ */

function GetInTouchCard({ getInTouch, spacing }) {
  return (
    <GraphicsCard>
      <Stack sx={{ alignItems: 'flex-start', p: spacing, gap: spacing }}>
        <Typeset
          heading={getInTouch.title}
          caption={getInTouch.description}
          headingProps={{ variant: 'h4' }}
          captionProps={{ variant: 'body1' }}
        />

        <Button variant="contained" size="large" {...getInTouch.link} {...(getInTouch.link?.href && { component: NextLink })} />
      </Stack>
    </GraphicsCard>
  );
}

/***************************  FAQ - 2  ***************************/

/**
 *
 * Demos:
 * - [FAQ2](https://www.Capitalta.io/blocks/faq/faq2)
 *
 * API:
 * - [FAQ2 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/faq/faq2#props-details)
 */

export default function Faq2({ heading, caption, defaultExpanded, faqList, getInTouch }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded || false);

  const cardRadius = 6;
  const accordionPX = { xs: 2, md: 3 };
  const getInTouchSpaccing = { xs: 3, sm: 4, md: 5 };

  // Handles the expansion of accordion panels
  const handleChange = (panel) => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  const isFocusWithin = useFocusWithin();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 3, sm: 1.5 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ justifyContent: 'space-between', height: 1 }}>
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
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.4
              }}
            >
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <GetInTouchCard getInTouch={getInTouch} spacing={getInTouchSpaccing} />
              </Box>
            </motion.div>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack
            sx={{
              gap: 1.5,
              '& .MuiAccordion-root:first-of-type': { borderTopLeftRadius: 4 * cardRadius, borderTopRightRadius: 4 * cardRadius },
              '& .MuiAccordion-root:last-of-type': { borderBottomLeftRadius: 4 * cardRadius, borderBottomRightRadius: 4 * cardRadius }
            }}
          >
            {faqList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.3
                }}
              >
                <Accordion
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                  sx={{
                    borderRadius: cardRadius,
                    bgcolor: 'grey.100',
                    ...(isFocusWithin && { '&:focus-within': generateFocusVisibleStyles(theme.vars.palette.primary.main) })
                  }}
                >
                  <AccordionSummary
                    expandIcon={<SvgIcon name="tabler-chevron-down" size={20} color="text.primary" />}
                    sx={{
                      px: accordionPX,
                      py: { xs: 1, sm: 1.5 },
                      '&.Mui-focusVisible': { bgcolor: 'transparent' },
                      '&:hover, &:hover svg': { color: 'primary.dark' }
                    }}
                    slotProps={{ content: { sx: { my: 1 } } }}
                  >
                    <Typography variant="h4">{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: accordionPX, pt: 0, pb: { xs: 1.5, sm: 2 } }}>
                    <FaqDetails answer={item.answer} />
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </Stack>
          <Box sx={{ mt: 3, display: { xs: 'block', sm: 'none' } }}>
            <GetInTouchCard getInTouch={getInTouch} spacing={getInTouchSpaccing} />
          </Box>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

GetInTouchCard.propTypes = { getInTouch: PropTypes.any, spacing: PropTypes.object };

Faq2.propTypes = {
  heading: PropTypes.any,
  caption: PropTypes.any,
  defaultExpanded: PropTypes.any,
  faqList: PropTypes.any,
  getInTouch: PropTypes.any
};
