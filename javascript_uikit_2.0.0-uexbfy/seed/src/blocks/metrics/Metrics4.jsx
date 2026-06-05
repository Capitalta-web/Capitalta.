import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  METRICS - 4  ***************************/

/**
 *
 * Demos:
 * - [Metrics4](https://www.saasable.io/blocks/metrics/metrics4)
 *
 * API:
 * - [Metrics4 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/metrics/metrics4#props-details)
 */

export default function Metrics4({ heading, caption, exploreBtn, blockDetail }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <GraphicsCard sx={{ height: 1, p: { xs: 2, sm: 4, md: 7 } }}>
        <Grid container spacing={{ xs: 3, md: 7 }}>
          <Grid size={{ xs: 12, sm: 5 }}>
            <Stack sx={{ gap: { xs: 1.5, sm: 3 }, alignItems: 'flex-start', justifyContent: 'space-between', height: 1 }}>
              <Typeset {...{ heading, caption, stackProps: { sx: { gap: { xs: 1, sm: 1.5 } } } }} />
              {exploreBtn && <Button color="primary" size="large" variant="contained" {...exploreBtn} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 7 }} container spacing={{ xs: 2.5, sm: 3, md: 4 }} sx={{ justifyContent: 'space-between', height: 1 }}>
            {blockDetail.map((item, index) => (
              <Grid key={index} size={6}>
                <Stack sx={{ gap: 1 }}>
                  <Stack direction="row" sx={{ alignItems: 'flex-end' }}>
                    <Typography component="div" variant="h1">
                      {item.counter}
                    </Typography>
                    <Typography component="div" variant="h3" sx={{ color: 'text.secondary', mb: { xs: 0.25, md: 0.625 } }}>
                      {item.defaultUnit}
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: 'text.secondary' }}>{item.caption}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </GraphicsCard>
    </ContainerWrapper>
  );
}

Metrics4.propTypes = { heading: PropTypes.any, caption: PropTypes.any, exploreBtn: PropTypes.any, blockDetail: PropTypes.any };
