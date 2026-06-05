'use client';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { ThemeDirection } from '@/config';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

const autoChangeInterval = 5000; // Change accordion every 3 seconds

/***************************  PROCESS - CARD  ***************************/

function TimelineCard({ cards, isTimeline, activeStep, handleStep }) {
  return (
    <Timeline sx={{ [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 }, p: 0, mb: 0, mt: { xs: 4, sm: 0 } }}>
      {cards.map((card, index) => (
        <Box key={index} onClick={() => handleStep(index)}>
          <TimelineItem sx={{ cursor: 'pointer', color: activeStep == index ? 'primary.main' : 'inherit' }}>
            {isTimeline && (
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    bgcolor: activeStep == index ? 'primary.lighter' : 'grey.100',
                    boxShadow: 'none',
                    p: { xs: 1.25, sm: 2 },
                    borderRadius: 4,
                    my: 0.25,
                    '&:hover': { bgcolor: 'grey.200' }
                  }}
                >
                  <SvgIcon {...(typeof card.icon === 'string' ? { name: card.icon } : { ...card.icon })} />
                </TimelineDot>
                {cards.length - 1 !== index && <TimelineConnector />}
              </TimelineSeparator>
            )}
            <TimelineContent sx={{ py: 0, ...(cards.length - 1 !== index && { pb: { xs: 4, sm: 6 } }) }}>
              <Stack sx={{ gap: 1 }}>
                <Typography variant="h4">{card.title}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{card.description}</Typography>
              </Stack>
            </TimelineContent>
          </TimelineItem>
        </Box>
      ))}
    </Timeline>
  );
}

/***************************  PROCESS - 4  ***************************/

/**
 *
 * Demos:
 * - [Process4](https://www.Capitalta.io/blocks/process/process4)
 *
 * API
 * - [Process4 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/process/process4#props-details)
 */

export default function Process4({ heading, caption, cards, isTimeline = true }) {
  const theme = useTheme();
  const grey100 = theme.vars.palette.grey[100];
  const gradient =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(78.19% 21.81% at 50% 50%, ${withAlpha(grey100, 0)} 0%, ${grey100} 100%)`
      : `radial-gradient(78.19% 78.19% at 50% 50%, ${withAlpha(grey100, 0)} 0%, ${grey100} 100%)`;

  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (step) => {
    setActiveStep(step);
  };

  // Update the active step at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % cards.length);
    }, autoChangeInterval);

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Typeset {...{ heading, caption, stackProps: { sx: { textAlign: 'center' } } }} />
        <Grid container spacing={{ sm: 2, md: 3 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <GraphicsCard sx={{ minHeight: { xs: 314, sm: 400, md: 408 }, height: 1 }}>
              <GraphicsImage
                image={cards[activeStep].image}
                sx={{
                  height: 1,
                  backgroundPositionX: { xs: '0%', sm: '-25%', md: '20%' },
                  transform: { xs: 'scale(1.2)', sm: 'scale(1)', md: 'scale(1.25)' },
                  backgroundPositionY: 'top',
                  backgroundSize: 'contain'
                }}
              >
                <Box sx={{ height: 1, background: gradient }} />
              </GraphicsImage>
            </GraphicsCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack direction="row" sx={{ alignItems: 'center', height: 1 }}>
              <TimelineCard {...{ cards, isTimeline, activeStep, handleStep }} />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

TimelineCard.propTypes = { cards: PropTypes.array, isTimeline: PropTypes.bool, activeStep: PropTypes.number, handleStep: PropTypes.func };

Process4.propTypes = { heading: PropTypes.string, caption: PropTypes.string, cards: PropTypes.array, isTimeline: PropTypes.bool };
