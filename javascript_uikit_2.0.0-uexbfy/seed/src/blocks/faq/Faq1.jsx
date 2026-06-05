'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import FaqDetails from '@/components/faq/FaqDetails';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import useFocusWithin from '@/hooks/useFocusWithin';
import { SECTION_COMMON_PY } from '@/utils/constant';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';

/***************************  FAQ - 1  ***************************/

/**
 *
 * Demos:
 * - [FAQ1](https://www.saasable.io/blocks/faq/faq1)
 *
 * API:
 * - [FAQ1 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/faq/faq1#props-details)
 */

export default function Faq1({ heading, caption, defaultExpanded, faqList }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded || false);

  const cardRadius = { xs: 6, sm: 8, md: 10 };
  const accordionRadius = { xs: cardRadius.xs * 4, sm: cardRadius.sm * 4, md: cardRadius.md * 4 };
  const accordionPX = { xs: 2, sm: 3, md: 4 };

  const handleChange = (panel) => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  const isFocusWithin = useFocusWithin();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.4
          }}
        >
          <Typeset {...{ heading, caption, headingProps: { component: 'div' } }} />
        </motion.div>
        <Stack
          sx={{
            gap: 1.5,
            '& .MuiAccordion-root:first-of-type': { borderTopLeftRadius: accordionRadius, borderTopRightRadius: accordionRadius },
            '& .MuiAccordion-root:last-of-type': { borderBottomLeftRadius: accordionRadius, borderBottomRightRadius: accordionRadius }
          }}
        >
          {faqList.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.3 }}
            >
              <Accordion
                key={index}
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
                    py: { xs: 1, sm: 1.5, md: 2 },
                    '&.Mui-focusVisible': { bgcolor: 'transparent' },
                    '&:hover, &:hover svg': { color: 'primary.dark' }
                  }}
                  slotProps={{ content: { sx: { my: 1 } } }}
                >
                  <Typography variant="h4" component="div">
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: accordionPX, pt: { xs: 0.5, sm: 1.5 }, pb: { xs: 1.5, sm: 2 } }} key={index}>
                  <FaqDetails answer={item.answer} />
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}

Faq1.propTypes = { heading: PropTypes.any, caption: PropTypes.any, defaultExpanded: PropTypes.any, faqList: PropTypes.any };
