import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import { NextLink } from '@/components/routes';
import SvgIcon from '@/components/SvgIcon';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  CLIENTELE - 7  ***************************/

/**
 *
 * Demos:
 * - [Clientele7](https://www.Capitalta.io/blocks/clientele/clientele7)
 *
 * API:
 * - [Clientele7 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/clientele/clientele7#props-details)
 */

export default function Clientele7({ title, clienteleList, exploreBtn }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: 4 }}>
        <Stack sx={{ gap: 1.5, alignItems: 'center' }}>
          {title && (
            <Typography variant="h3" align="center" sx={{ color: 'text.secondary', maxWidth: { xs: 260, sm: 360 } }}>
              {title}
            </Typography>
          )}
          {exploreBtn && (
            <Button
              sx={{ '& svg.tabler-arrow-up-left': { transform: 'rotate(90deg)' } }}
              startIcon={<SvgIcon name="tabler-arrow-up-left" size={18} />}
              {...(exploreBtn.href && { component: NextLink })}
              {...exploreBtn}
            />
          )}
        </Stack>
        <Grid container spacing={1.5} sx={{ justifyContent: 'center' }}>
          {clienteleList.map((item, index) => (
            <Grid key={index} size={{ xs: 4, sm: 2.3 }}>
              <Stack
                sx={{
                  height: 1,
                  py: 1.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  '& svg': {
                    opacity: 0.4,
                    transition: 'all 0.5s ease-in-out',
                    '&:hover': { opacity: 1, transition: 'all 0.5s ease-in-out' }
                  }
                }}
              >
                <GraphicsImage {...item} />
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Clientele7.propTypes = { title: PropTypes.string, clienteleList: PropTypes.array, exploreBtn: PropTypes.any };
