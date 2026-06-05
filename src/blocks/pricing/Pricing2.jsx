'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @mui
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  STRIPE TABLE - ROW  ***************************/

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderRadius: 100,
  '&:nth-of-type(odd)': {
    backgroundColor: theme.vars.palette.grey[100]
  }
}));

/***************************  PRICING - 2  ***************************/

/**
 *
 * Demos:
 * - [Pricing2](https://www.Capitalta.io/blocks/pricing/pricing2)
 *
 * API
 * - [Pricing2 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/pricing/pricing2#props-details)
 */

export default function Pricing2({ heading, caption, defaultUnit, features, plans }) {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [unit, setUnit] = useState(defaultUnit || 'monthly');

  const cellSX = { p: { xs: 2, sm: 2.5, md: 3 }, px: { xs: 1.25, sm: 2.5, md: 3 } };
  const firstColumnSX = { borderTopLeftRadius: 25, borderBottomLeftRadius: 25 };
  const lastColumnSX = { borderTopRightRadius: 25, borderBottomRightRadius: 25 };
  const activeColumnSX = { border: '1px solid', borderColor: 'primary.main', BorderBottom: 'none' };
  const activeRadius = { xs: 4 * 6, sm: 4 * 8, md: 4 * 10 };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: 4 }}>
        {heading && <Typeset {...{ heading, caption, captionProps: { sx: { maxWidth: 750 } } }} />}
        <Stack direction="row" sx={{ justifyContent: 'center', py: 0.5 }}>
          <ButtonGroup
            disableElevation
            disableFocusRipple
            variant="outlined"
            rel="noopener noreferrer"
            aria-label="Disabled button group"
            sx={{
              display: 'flex',
              gap: 1,
              p: 0.5,
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: 25,
              maxWidth: 485,
              width: { xs: 1, sm: 485 }
            }}
          >
            <Button
              fullWidth
              variant={unit === 'monthly' ? 'contained' : 'text'}
              sx={{ '&.MuiButtonGroup-firstButton': { borderRadius: 25 } }}
              onClick={() => setUnit('monthly')}
            >
              Monthly
            </Button>
            <Button
              fullWidth
              variant={unit === 'yearly' ? 'contained' : 'text'}
              sx={{ '&.MuiButtonGroup-lastButton': { borderRadius: 25 } }}
              onClick={() => setUnit('yearly')}
            >
              Yearly
            </Button>
          </ButtonGroup>
        </Stack>
        <Table sx={{ borderCollapse: 'separate' }}>
          <TableHead sx={{ '& .MuiTableCell-root': { borderBottom: 'none' } }}>
            <TableRow>
              <TableCell sx={{ minWidth: { xs: 138, sm: 210, md: 282 }, verticalAlign: 'bottom' }}>
                <Typography variant="h6">Features</Typography>
              </TableCell>
              {plans.map((plan, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    p: { xs: 2, md: 3 },
                    ...(plan.active && { ...activeColumnSX, borderTopLeftRadius: activeRadius, borderTopRightRadius: activeRadius })
                  }}
                >
                  <Box sx={{ py: { xs: 0.25, sm: 0.5, md: 3 } }}>
                    <Typography variant={downSM ? 'subtitle1' : 'h2'}>
                      ${unit === 'yearly' ? plan.price.yearly : plan.price.monthly}
                    </Typography>
                    <Typography variant={downSM ? 'subtitle2' : 'h5'} sx={{ mt: { xs: 0.5, sm: 1.5 }, fontWeight: 500 }}>
                      {plan.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, display: { xs: 'none', md: 'block' } }}>
                      {plan.description}
                    </Typography>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {features.map((feature, index) => (
              <StyledTableRow key={index}>
                <TableCell sx={{ ...cellSX, ...firstColumnSX }}>
                  <Typography variant="subtitle1">
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
                      ...(plan.active && { ...activeColumnSX, borderTop: 'none', borderBottom: 'none' }),
                      ...(index === plans.length - 1 && { ...lastColumnSX }),
                      '& .MuiBox-root svg': {
                        display: 'inline-block'
                      }
                    }}
                  >
                    {plan.features.includes(feature.id) ? (
                      <SvgIcon
                        name="custom-check"
                        type={IconType.CUSTOM}
                        color="primary.main"
                        stroke={3}
                        twoToneColor={theme.vars.palette.background.default}
                      />
                    ) : (
                      <SvgIcon name="tabler-minus" stroke={2} />
                    )}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter sx={{ display: { xs: 'contents', sm: 'none' } }}>
            <TableRow>
              <TableCell sx={{ border: 'none' }} />
              {plans.map((plan, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    ...cellSX,
                    border: 'none',
                    ...(plan.active && {
                      ...activeColumnSX,
                      borderTop: 'none',
                      borderBottomLeftRadius: activeRadius,
                      borderBottomRightRadius: activeRadius
                    })
                  }}
                />
              ))}
            </TableRow>
          </TableFooter>
          <TableFooter sx={{ display: { xs: 'none', sm: 'contents' } }}>
            <TableRow>
              <TableCell sx={{ border: 'none' }} />
              {plans.map((plan, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    ...cellSX,
                    border: 'none',
                    ...(plan.active && {
                      ...activeColumnSX,
                      borderTop: 'none',
                      borderBottomLeftRadius: activeRadius,
                      borderBottomRightRadius: activeRadius
                    })
                  }}
                >
                  <Button fullWidth variant={plan.active ? 'contained' : 'outlined'} sx={{ px: 1.25 }} {...plan.exploreLink} />
                </TableCell>
              ))}
            </TableRow>
          </TableFooter>
        </Table>
      </Stack>
      {downSM && (
        <Stack sx={{ mt: 4, gap: 1.5 }}>
          {plans.map((plan, index) => (
            <GraphicsCard key={index}>
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2, gap: 1.5 }}>
                <Stack sx={{ gap: 0.5 }}>
                  <Typography variant="h3" sx={{ mt: { xs: 0.5, sm: 1.5 } }}>
                    {plan.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    ${unit === 'yearly' ? plan.price.yearly : plan.price.monthly}/{unit === 'yearly' ? 'year' : 'month'}
                  </Typography>
                </Stack>
                <Button variant={plan.active ? 'contained' : 'outlined'} sx={{ px: 1.25 }} {...plan.exploreLink} />
              </Stack>
            </GraphicsCard>
          ))}
        </Stack>
      )}
    </ContainerWrapper>
  );
}

Pricing2.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  defaultUnit: PropTypes.string,
  features: PropTypes.array,
  plans: PropTypes.array
};
