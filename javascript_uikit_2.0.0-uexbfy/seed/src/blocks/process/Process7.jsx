'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme, styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';
import { isEmpty } from 'lodash-es';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  PROCESS - STEPPER  ***************************/

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 38,
    left: 'calc(-50% + 32px)',
    right: 'calc(50% + 32px)'
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.vars.palette.secondary.lighter,
    borderTopWidth: 2,
    borderRadius: 1
  }
}));

function StepperCard({ cards }) {
  const CustomIcon = (icon) => (
    <Avatar variant="rounded" sx={{ bgcolor: 'grey.100', width: 60, height: 60, borderRadius: 4, mr: 0 }}>
      <SvgIcon {...(typeof icon === 'string' ? { name: icon } : { ...icon })} />
    </Avatar>
  );

  return (
    <Stepper activeStep={2} alternativeLabel orientation="horizontal" connector={<ColorlibConnector />}>
      {cards.map((card, index) => (
        <Step key={index} completed>
          <StepLabel slots={{ stepIcon: () => CustomIcon(card.icon) }} sx={{ py: 1 }}>
            <Typeset
              {...{
                heading: card.title,
                caption: card.description,
                headingProps: { variant: 'h4' },
                captionProps: { variant: 'body1' },
                stackProps: { sx: { gap: 1 } }
              }}
            />
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

/***************************  PROCESS - TIMELINE  ***************************/

function TimelineCard({ cards }) {
  return (
    <Timeline sx={{ [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 }, p: 0, mb: 0, mt: 1 }}>
      {cards.map((card, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot sx={{ bgcolor: 'grey.100', boxShadow: 'none', p: 1.25, borderRadius: 4, my: 0.25 }}>
              <SvgIcon {...(typeof card.icon === 'string' ? { name: card.icon } : { ...card.icon })} />
            </TimelineDot>
            {cards.length - 1 !== index && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent sx={{ py: 0, ...(cards.length - 1 !== index && { pb: 4 }) }}>
            <Typeset
              {...{
                heading: card.title,
                caption: card.description,
                headingProps: { variant: 'h4' },
                captionProps: { variant: 'body1' },
                stackProps: { sx: { gap: 1 } }
              }}
            />
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

/***************************  PROCESS - 7  ***************************/

/**
 *
 * Demos:
 * - [Process7](https://www.saasable.io/blocks/process/process7)
 *
 * API
 * - [Process7 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/process/process7#props-details)
 */

export default function Process7({ heading, caption, cards, image1, card1sx, image2 }) {
  const theme = useTheme();

  const grey100 = theme.vars.palette.grey[100];
  const gradient =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(80.81% 19.19% at 50% 39.56%, ${withAlpha(grey100, 0)} 0%, ${withAlpha(grey100, 0.7)} 100%)`
      : `radial-gradient(80.81% 80.81% at 50% 39.56%, ${withAlpha(grey100, 0)} 0%, ${withAlpha(grey100, 0.7)} 100%)`;

  const imageBoxRadius = { xs: 3, sm: 5 };
  const imageRadius = { borderTopLeftRadius: { xs: 12 }, borderBottomRightRadius: { xs: 24, sm: 32, md: 40 } };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.5
          }}
        >
          <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />
        </motion.div>
        <Grid container spacing={1.5} sx={{ alignItems: 'center', height: 1 }}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.6
              }}
            >
              <GraphicsCard sx={{ pl: imageBoxRadius, pt: imageBoxRadius, height: { xs: 302, sm: 297, md: 377 }, ...card1sx }}>
                <GraphicsImage
                  image={image1}
                  sx={{
                    height: 1,
                    backgroundPositionX: 'left',
                    backgroundPositionY: 'top',
                    ...(isEmpty(card1sx) && {
                      borderLeft: '5px solid',
                      borderTop: '5px solid',
                      borderColor: 'grey.200'
                    }),
                    ...imageRadius
                  }}
                >
                  <Box
                    sx={{
                      width: 1,
                      height: 1,
                      ...imageRadius,
                      background: `radial-gradient(43.69% 65.53% at 14.27% 46.41%, ${withAlpha(theme.vars.palette.grey[100], 0)} 0%, ${withAlpha(theme.vars.palette.grey[100], 0.6)} 100%)`
                    }}
                  />
                </GraphicsImage>
              </GraphicsCard>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.7
              }}
            >
              <GraphicsCard sx={{ height: { xs: 194, sm: 297, md: 377 } }}>
                <GraphicsImage
                  image={image2}
                  sx={{
                    height: 1,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: { xs: '56% 37px', sm: '40px 110px', md: '46px 105px' },
                    transform: { xs: 'scale(1.3)', md: 'scale(1)' }
                  }}
                >
                  <Box sx={{ height: 1, background: gradient }} />
                </GraphicsImage>
              </GraphicsCard>
            </motion.div>
          </Grid>
          <Grid size={12} sx={{ mt: { xs: 1.5, md: 3 } }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.6
              }}
            >
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <TimelineCard {...{ cards }} />
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <StepperCard {...{ cards }} />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

StepperCard.propTypes = { cards: PropTypes.array };

TimelineCard.propTypes = { cards: PropTypes.array };

Process7.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  cards: PropTypes.array,
  image1: PropTypes.any,
  card1sx: PropTypes.any,
  image2: PropTypes.any
};
