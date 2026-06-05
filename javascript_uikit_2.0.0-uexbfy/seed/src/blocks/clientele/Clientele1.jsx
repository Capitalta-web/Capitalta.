'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import Marquee from 'react-fast-marquee';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import { ThemeDirection } from '@/config';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  CLIENTELE - 1  ***************************/

/**
 *
 * Demos:
 * - [Clientele1](https://www.saasable.io/blocks/clientele/clientele1)
 *
 * API:
 * - [Clientele1 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/clientele/clientele1#props-details)
 */

export default function Clientele1({ title, clienteleList }) {
  const theme = useTheme();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 2.5, sm: 1.5 }} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            {title}
          </Typography>
        </Grid>
        <Grid sx={{ '.slick-track': { display: 'flex', alignItems: 'center' } }} size={{ xs: 12, sm: 9 }}>
          <Marquee pauseOnHover autoFill {...(theme.direction === ThemeDirection.RTL && { direction: 'right' })}>
            {clienteleList.map((item, index) => (
              <Stack
                key={index}
                sx={{
                  alignItems: 'center',
                  px: { xs: 1.5, sm: 2, md: 3 },
                  '& svg': { opacity: 0.4, transition: ' all 0.5s ease-in-out' },
                  '&:hover svg': { opacity: 1, transition: ' all 0.5s ease-in-out' }
                }}
              >
                <GraphicsImage {...item} />
              </Stack>
            ))}
          </Marquee>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

Clientele1.propTypes = { title: PropTypes.string, clienteleList: PropTypes.array };
