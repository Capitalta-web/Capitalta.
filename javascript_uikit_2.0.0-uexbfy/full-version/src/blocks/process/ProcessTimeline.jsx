'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';

// @mui/lab
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';

// @third-party
import { motion } from 'framer-motion';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

export default function ProcessTimeline({ heading, caption, cards }) {
  const theme = useTheme();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack spacing={6}>
        <Typeset heading={heading} caption={caption} stackProps={{ sx: { textAlign: 'center' } }} />
        
        <Box sx={{ width: '100%' }}>
          <Timeline
            position="alternate"
            sx={{
              p: 0,
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
              },
              // En movil, cambiar a timeline alineado a la derecha o izquierda
              [theme.breakpoints.down('md')]: {
                [`& .${timelineOppositeContentClasses.root}`]: {
                  flex: 0,
                  padding: 0,
                  display: 'none'
                },
              }
            }}
          >
            {cards.map((card, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  sx={{ 
                    m: 'auto 0',
                    display: { xs: 'none', md: 'block' }
                  }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  Paso {index + 1}
                </TimelineOppositeContent>
                
                <TimelineSeparator>
                  <TimelineConnector sx={{ bgcolor: 'primary.lighter', height: 40 }} />
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <TimelineDot 
                      color="primary" 
                      variant={index === 4 ? "filled" : "outlined"} // Highlight step 5 (index 4)
                      sx={{ 
                        p: 2, 
                        borderColor: 'primary.main',
                        borderWidth: 2,
                        ...(index === 4 && { 
                          bgcolor: 'primary.main',
                          boxShadow: '0 0 0 8px rgba(28, 124, 119, 0.15)'
                        })
                      }}
                    >
                      <SvgIcon 
                        name={card.icon} 
                        type={IconType.STROKE} 
                        size={24} 
                        color={index === 4 ? 'common.white' : 'primary.main'} 
                      />
                    </TimelineDot>
                  </motion.div>
                  <TimelineConnector sx={{ bgcolor: 'primary.lighter' }} />
                </TimelineSeparator>
                
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        p: 3,
                        bgcolor: 'background.paper',
                        boxShadow: theme.customShadows ? theme.customShadows.z1 : 1,
                        border: '1px solid',
                        borderColor: 'grey.200',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: theme.customShadows ? theme.customShadows.z8 : 4,
                          transform: 'translateY(-4px)'
                        }
                      }}
                    >
                      <Typography variant="h6" component="span" sx={{ display: 'block', mb: 1, fontWeight: 700 }}>
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {card.description}
                      </Typography>
                      
                      {card.list && (
                        <Stack spacing={1}>
                          {card.list.map((item, i) => (
                            <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                              <SvgIcon name="tabler-check" size={16} color="primary.main" sx={{ mt: 0.5, flexShrink: 0 }} />
                              <Typography variant="caption" color="text.primary">
                                {item.primary}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      )}
                    </Card>
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
      </Stack>
    </ContainerWrapper>
  );
}

ProcessTimeline.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  cards: PropTypes.array
};
