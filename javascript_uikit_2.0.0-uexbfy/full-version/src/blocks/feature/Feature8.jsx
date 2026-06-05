'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @mui
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

// @third-party
import { motion } from 'framer-motion';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

function StepperCard({ cards, activeStep, handleStep }) {
  const CustomIcon = (icon) => (
    <Avatar variant="rounded" sx={{ bgcolor: 'grey.100', width: 60, height: 60, borderRadius: 4, mr: { xs: 0.5, sm: 1 } }}>
      <SvgIcon {...(typeof icon === 'string' ? { name: icon } : { ...icon })} />
    </Avatar>
  );

  return (
    <Stepper
      nonLinear
      activeStep={activeStep}
      orientation="vertical"
      connector={<StepConnector sx={{ [`& .${stepConnectorClasses.line}`]: { display: 'none' } }} />}
    >
      {cards.map((card, index) => (
        <Step key={index} sx={{ cursor: 'pointer', ':hover': { bgcolor: 'grey.50' } }}>
          <StepLabel
            slots={{ stepIcon: () => CustomIcon(card.icon) }}
            onClick={() => {
              handleStep(index);
            }}
            sx={{
              py: { xs: 2, md: 3 },
              alignItems: 'flex-start',
              borderLeft: '2px solid',
              borderColor: activeStep == index ? 'primary.main' : 'grey.600',
              pl: { xs: 2, md: 3 }
            }}
          >
            <Typeset
              {...{
                heading: card.title,
                caption: card.description,
                headingProps: { variant: 'h4', sx: { color: 'text.primary' } },
                captionProps: { variant: 'body1', sx: { maxWidth: 350 } },
                stackProps: { sx: { gap: 1 } }
              }}
            />
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

/***************************  FEATURE - 8  ***************************/

/**
 *
 * Demos:
 * - [Feature8](https://www.Capitalta.io/blocks/feature/feature8)
 *
 * API
 * - [Feature8 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/feature/feature8#props-details)
 */

export default function Feature8({ heading, caption, cards }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (step) => {
    setActiveStep(step);
  };

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
          <Grid size={{ xs: 12, sm: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.6
              }}
            >
              <StepperCard cards={cards} activeStep={activeStep} handleStep={handleStep} />
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.7
              }}
            >
              <GraphicsCard sx={{ p: { xs: 3, md: 8 }, height: { xs: 358, sm: 536, md: 544 } }}>
                <GraphicsImage
                  sx={{ height: 1, backgroundPosition: 'center', backgroundSize: 'contain' }}
                  image={cards[activeStep].image}
                />
              </GraphicsCard>
            </motion.div>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

StepperCard.propTypes = { cards: PropTypes.array, activeStep: PropTypes.number, handleStep: PropTypes.func };

Feature8.propTypes = { heading: PropTypes.string, caption: PropTypes.string, cards: PropTypes.array };
