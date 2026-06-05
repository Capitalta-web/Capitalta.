'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';
import GetImagePath from '@/utils/GetImagePath';

/***************************  TEAM - 7  ***************************/

/**
 *
 * Demos:
 * - [Team7](https://www.Capitalta.io/blocks/team/team7)
 *
 * API
 * - [Team7 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/team/team7#props-details)
 */

export default function Team7({ heading, caption, members }) {
  const theme = useTheme();
  const blurEffect = { bgcolor: withAlpha(theme.vars.palette.grey[200], 0.4), backdropFilter: 'blur(8px)' };
  const cardRadius = { xs: 3, sm: 4, md: 6 };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Typeset {...{ heading, caption }} />
        <Grid container spacing={1.5}>
          {members.map((item, index) => (
            <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
              <CardMedia
                image={GetImagePath(item.avatar)}
                sx={{
                  bgcolor: withAlpha(theme.vars.palette.grey[600], 0.6),
                  height: { xs: 220, sm: 300, md: 350 },
                  position: 'relative',
                  borderRadius: cardRadius,
                  filter: 'grayscale(1)',
                  '&:hover': { filter: 'grayscale(0)', '.MuiStack-root': { visibility: 'visible' } }
                }}
              >
                <Stack
                  sx={{
                    gap: { xs: 0.5, sm: 1 },
                    position: 'absolute',
                    borderRadius: cardRadius,
                    bottom: { xs: 4, md: 8 },
                    left: '50%',
                    width: { xs: 'calc(100% - 8px)', md: 'calc(100% - 16px)' },
                    p: { xs: 0.75, md: 2 },
                    textAlign: 'center',
                    visibility: 'hidden',
                    transform: 'translateX(-50%)',
                    ...blurEffect
                  }}
                >
                  <Typography variant="h4">{item.name}</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{item.role}</Typography>
                </Stack>
              </CardMedia>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Team7.propTypes = { heading: PropTypes.any, caption: PropTypes.any, members: PropTypes.any };
