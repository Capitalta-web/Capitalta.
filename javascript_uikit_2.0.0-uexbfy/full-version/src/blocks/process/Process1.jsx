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
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';
import { GraphicsCard } from '@/components/cards';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { IconType } from '@/enum';
import useFocusWithin from '@/hooks/useFocusWithin';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  PROCESS - CARD  ***************************/

/**
 *
 * Demos:
 * - [Process1](https://www.Capitalta.io/blocks/process/process1)
 *
 * API
 * - [Process1 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/process/process1#props-details)
 */

function CommonCard({ title, description, list, icon, expanded, moreLink, handleChange, index }) {
  const theme = useTheme();
  const isFocusWithin = useFocusWithin();

  return (
    <GraphicsCard sx={{ ...(isFocusWithin && { '&:focus-within': generateFocusVisibleStyles(theme.vars.palette.primary.main) }) }}>
      <Accordion
        disableGutters
        expanded={expanded === `panel${index}`}
        onChange={handleChange(`panel${index}`)}
        sx={{
          p: { xs: 3, md: 4 },
          bgcolor: 'transparent'
        }}
      >
        <AccordionSummary
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}
          sx={{
            p: 0,
            '&.Mui-focusVisible': { bgcolor: 'transparent' },
            '&:hover, :hover svg': { color: 'primary.dark' }
          }}
          slotProps={{ content: { sx: { m: 0 } } }}
        >
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between', width: 1, gap: { xs: 3, md: 4 } }}>
            <Stack sx={{ gap: 1.5 }}>
              <Typography variant="h4">{title}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
            </Stack>
            <SvgIcon type={IconType.CUSTOM} size={40} {...(typeof icon === 'string' ? { name: icon } : { ...icon })} />
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, width: { xs: '90%', sm: '85%', md: '80%' } }}>
          {list && (
            <List disablePadding sx={{ pt: { xs: 1.5, md: 2.5 } }}>
              {list.slice(0, 3).map((item, itemIndex) => (
                <ListItem key={itemIndex} sx={{ px: 0 }}>
                  <ListItemAvatar sx={{ minWidth: 34, height: 24 }}>
                    <SvgIcon name="custom-check" type={IconType.CUSTOM} color="primary.main" />
                  </ListItemAvatar>
                  <ListItemText primary={item.primary} slotProps={{ primary: { variant: 'body2', sx: { color: 'text.secondary' } } }} />
                </ListItem>
              ))}
            </List>
          )}
          {list && list.length > 2 && moreLink && <Link component={NextLink} variant="subtitle1" {...moreLink} sx={{ ml: 4.25 }} />}
        </AccordionDetails>
      </Accordion>
    </GraphicsCard>
  );
}

/***************************  PROCESS - 1  ***************************/

export default function Process1({ heading, defaultExpanded, caption, cards, image }) {
  const [expanded, setExpanded] = useState(defaultExpanded || 'panel0');

  const handleChange = (panel) => () => {
    setExpanded(panel);
  };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={1.5} sx={{ height: 1 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 3, justifyContent: 'space-between', height: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.5
              }}
            >
              <Typeset {...{ heading, caption, stackProps: { sx: { gap: 1.5 } } }} />
            </motion.div>
            <Stack sx={{ gap: 1.5 }}>
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.15
                  }}
                >
                  <CommonCard {...card} index={index} expanded={expanded} handleChange={handleChange} />
                </motion.div>
              ))}
            </Stack>
          </Stack>
        </Grid>
        {image && (
          <Grid sx={{ display: { xs: 'none', sm: 'block' } }} size={{ xs: 12, sm: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.8
              }}
              style={{ height: '100%' }}
            >
              <GraphicsCard sx={{ height: 1 }}>
                <Box sx={{ pl: 5, py: 5, minHeight: 880, height: 1 }}>
                  <GraphicsImage
                    image={image}
                    sx={{
                      border: '5px solid',
                      borderColor: 'grey.200',
                      borderRight: 'none',
                      height: 1,
                      backgroundPositionX: 'left',
                      backgroundPositionY: 'top',
                      borderTopLeftRadius: 12,
                      borderBottomLeftRadius: 20
                    }}
                  />
                </Box>
              </GraphicsCard>
            </motion.div>
          </Grid>
        )}
      </Grid>
    </ContainerWrapper>
  );
}

CommonCard.propTypes = {
  title: PropTypes.any,
  description: PropTypes.any,
  list: PropTypes.any,
  icon: PropTypes.any,
  expanded: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  moreLink: PropTypes.any,
  handleChange: PropTypes.func,
  index: PropTypes.number
};

Process1.propTypes = {
  heading: PropTypes.string,
  defaultExpanded: PropTypes.string,
  caption: PropTypes.string,
  cards: PropTypes.array,
  image: PropTypes.any
};
