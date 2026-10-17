'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import ContainerWrapper from './ContainerWrapper';
import SvgIcon from './SvgIcon';

import { ThemeDirection } from '@/config';
import { getBackgroundDots } from '@/utils/getBackgroundDots';

// @assets
import Wave from '@/images/graphics/Wave';

/***************************  SECTION HERO  ***************************/

export default function SectionHero({ heading, caption, breadcrumbs }) {
  const theme = useTheme();

  const boxRadius = { xs: 24, sm: 40 };

  return (
    <Box
      sx={{
        overflow: 'hidden',
        py: { xs: 3, sm: 5, md: 8 },
        bgcolor: 'grey.100',
        borderBottomLeftRadius: boxRadius,
        borderBottomRightRadius: boxRadius,
        ...getBackgroundDots(theme.vars.palette.grey[300])
      }}
    >
      <ContainerWrapper>
        <Stack sx={{ alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
          {breadcrumbs && (
            <Chip
              variant="outlined"
              label={
                <Breadcrumbs
                  separator={
                    <SvgIcon
                      name={theme.direction === ThemeDirection.RTL ? 'tabler-chevron-left' : 'tabler-chevron-right'}
                      size={16}
                      color="text.primary"
                    />
                  }
                  rel="noopener noreferrer"
                  aria-label="main-breadcrumb"
                  sx={{ '& .MuiBreadcrumbs-separator': { mx: 0.5 } }}
                >
                  {breadcrumbs?.map((item, index) => (
                    <Link
                      component={NextLink}
                      key={index}
                      variant="caption"
                      color={breadcrumbs.length - 1 !== index ? 'inherit' : 'primary.main'}
                      href={item.to && breadcrumbs.length - 1 !== index ? item.to : ''}
                    >
                      {item.title}
                    </Link>
                  ))}
                </Breadcrumbs>
              }
              slotProps={{ label: { sx: { py: 0.5, px: 1.5 } } }}
              sx={{ bgcolor: 'grey.100' }}
            />
          )}
          <Typography variant="h1" sx={{ textAlign: 'center', width: { xs: 345, sm: 550, md: 700 } }}>
            {heading}
          </Typography>
          {caption && (
            <Typography variant="h5" color="text.secondary" sx={{ textAlign: 'center', maxWidth: { xs: 345, sm: 550, md: 700 }, mt: 2 }}>
              {caption}
            </Typography>
          )}
          <Box sx={{ py: { xs: 0.575, md: 0.875 } }}>
            <Wave />
          </Box>
        </Stack>
      </ContainerWrapper>
    </Box>
  );
}

SectionHero.propTypes = { heading: PropTypes.string, caption: PropTypes.string, breadcrumbs: PropTypes.array };
