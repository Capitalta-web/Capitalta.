import PropTypes from 'prop-types';
// @mui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  CLIENTELE - 4  ***************************/

/**
 *
 * Demos:
 * - [Clientele4](https://www.saasable.io/blocks/clientele/clientele4)
 *
 * API:
 * - [Clientele4 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/clientele/clientele4#props-details)
 */

export default function Clientele4({ title, clienteleList }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 3, sm: 2.5, md: 3 }}>
        <Grid size={{ xs: 12, sm: 3, md: 2.5 }}>
          {title && (
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              {title}
            </Typography>
          )}
        </Grid>
        <Grid container spacing={1.5} size={{ xs: 12, sm: 9, md: 9.5 }}>
          {clienteleList.map((item, index) => (
            <Grid
              key={index}
              size={{ xs: 4, md: 3 }}
              sx={{
                pb: 1.5,
                '& svg': { opacity: 0.4, transition: 'all 0.5s ease-in-out', '&:hover': { opacity: 1, transition: 'all 0.5s ease-in-out' } }
              }}
            >
              <GraphicsImage {...item} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

Clientele4.propTypes = { title: PropTypes.string, clienteleList: PropTypes.array };
