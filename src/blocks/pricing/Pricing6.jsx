import PropTypes from 'prop-types';
// @mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  PRICING - 6  ***************************/

/**
 *
 * Demos:
 * - [Pricing6](https://www.Capitalta.io/blocks/pricing/pricing6)
 *
 * API
 * - [Pricing6 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/pricing/pricing6#props-details)
 */

export default function Pricing6({ heading, caption, features, plans }) {
  const cellSX = { p: { xs: 1.5, sm: 2.5, md: 3 } };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Typeset {...{ heading, caption }} />
        <Stack sx={{ gap: 1.5 }}>
          <Grid container spacing={1.5} sx={{ justifyContent: 'flex-end', ml: { md: -3 } }}>
            {plans.map((plan, index) => (
              <Grid key={index} size={{ xs: 12, sm: 4, md: 3 }}>
                <GraphicsCard
                  sx={{
                    height: 1,
                    position: 'relative',
                    ...(plan.active && { bgcolor: 'grey.300', overflow: 'unset', border: '1px solid', borderColor: 'primary.main' })
                  }}
                >
                  {plan.active && (
                    <Chip
                      label={plan.active}
                      size="small"
                      slotProps={{ label: { sx: { px: 1.5, pb: 0, pt: 0.25, typography: 'caption' } } }}
                      sx={{
                        bgcolor: 'primary.lighter',
                        border: '1px solid',
                        borderColor: 'primary.main',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translate(-50%,-50%)'
                      }}
                    />
                  )}
                  <Stack
                    sx={{ p: { xs: 2, md: 4 }, gap: { xs: 2, sm: 2.5 }, alignItems: 'center', height: 1, justifyContent: 'space-between' }}
                  >
                    {plan.icon && (
                      <Avatar variant="rounded" sx={{ width: 32, height: 32, bgcolor: 'primary.lighter' }}>
                        <SvgIcon {...(typeof plan.icon === 'string' ? { name: plan.icon } : { ...plan.icon })} />
                      </Avatar>
                    )}
                    <Stack sx={{ gap: 0.5, alignItems: 'center' }}>
                      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                        {plan.title}
                      </Typography>
                      <Stack direction="row" sx={{ alignItems: 'flex-end', justifyContent: 'center', gap: 0.5 }}>
                        <Typography component="div" variant="h3" sx={{ mb: { xs: 0.25, sm: 0.5 } }}>
                          {plan.defaultUnit}
                        </Typography>
                        {plan.price && <Typography variant="h2">{plan.price}</Typography>}
                      </Stack>
                      <Typography variant="body2" noWrap>
                        {plan.description}
                      </Typography>
                    </Stack>
                    <Button fullWidth variant={plan.active ? 'contained' : 'outlined'} sx={{ px: 1.25 }} {...plan.exploreLink} />
                  </Stack>
                </GraphicsCard>
              </Grid>
            ))}
          </Grid>
          <Table sx={{ borderCollapse: 'separate' }}>
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-root': { borderBottom: '1px solid', borderColor: 'divider' } }}>
                <TableCell colSpan={12} sx={{ ...cellSX }}>
                  <Typography variant="h6">Features</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {features.map((feature, index) => (
                <TableRow
                  key={index}
                  sx={{ '& .MuiTableCell-root': { borderColor: 'divider', borderRight: 'none', borderLeft: 'none', borderRadius: 0 } }}
                >
                  <TableCell sx={{ width: { xs: 195, sm: 210, md: 282 }, ...cellSX }}>
                    <Typography variant="subtitle2">
                      {feature.label}
                      <Tooltip title={feature.label} aria-label={feature.label}>
                        <Box
                          component="span"
                          sx={{ lineHeight: 0, cursor: 'pointer', display: 'inline-block', ml: 0.5, verticalAlign: 'text-top' }}
                        >
                          <SvgIcon name="tabler-help-circle" size={16} stroke={2} />
                        </Box>
                      </Tooltip>
                    </Typography>
                  </TableCell>
                  {plans.map((plan, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      sx={{
                        ...cellSX,
                        ...(index % 2 === 1 && { backgroundColor: 'grey.100' }),
                        '& .MuiBox-root svg': {
                          display: 'inline-block'
                        }
                      }}
                    >
                      {plan.features.includes(feature.id) ? (
                        <SvgIcon name="custom-check" type={IconType.CUSTOM} stroke={2} color="primary.main" />
                      ) : (
                        <SvgIcon name="tabler-minus" stroke={2} />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}

Pricing6.propTypes = { heading: PropTypes.string, caption: PropTypes.string, features: PropTypes.array, plans: PropTypes.array };
