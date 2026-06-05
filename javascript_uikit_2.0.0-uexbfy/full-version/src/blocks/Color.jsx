'use client';
import PropTypes from 'prop-types';

// @mui
import { useColorScheme, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { Themes, ThemeMode } from '@/config';
import { GraphicsCard } from '@/components/cards';
import useConfig from '@/hooks/useConfig';

// get theme wise color string
function getColorString(themes) {
  switch (themes) {
    case Themes.THEME_DEFAULT:
      return 'DEFAULT';
    case Themes.THEME_AI:
      return 'AI';
    case Themes.THEME_HOSTING:
      return 'HOSTING';
    case Themes.THEME_CRM:
    default:
      return 'CRM';
  }
}

// get theme wise primary/secondary color offset
function getColorCode(themes, index, colorScheme = 'light') {
  const lightModeCodes = [90, 80, 40, 30, 10];
  const darkModeCodes = [30, 60, 80, 90, 95];

  const code1 = colorScheme === ThemeMode.DARK ? darkModeCodes : lightModeCodes;

  switch (themes) {
    case Themes.THEME_DEFAULT:
    case Themes.THEME_AI:
    case Themes.THEME_HOSTING:
    case Themes.THEME_CRM:
    default:
      return code1[index];
  }
}

// get theme wise grey color offset
function getGreyCode(themes, index, colorScheme = 'light') {
  const lightModeCodes = [98, 96, 94, 92, 90, 87, 80, 50, 30, 10];
  const darkModeCodes = [6, 10, 12, 17, 22, 4, 30, 60, 80, 90];

  const code1 = colorScheme === ThemeMode.DARK ? darkModeCodes : lightModeCodes;

  switch (themes) {
    case Themes.THEME_DEFAULT:
    case Themes.THEME_AI:
    case Themes.THEME_HOSTING:
    case Themes.THEME_CRM:
    default:
      return code1[index];
  }
}

/***************************  COLOR - CARD  ***************************/

function ColorBox({ value, color, muiLabel, figmaLabel, figmaValue, main = false }) {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <GraphicsCard
        sx={{
          borderRadius: 4,
          ...(main && { border: '1px dashed', borderColor: 'primary.main' }),
          ...(muiLabel === 'grey.100' && { bgcolor: 'grey.200' })
        }}
      >
        <Box sx={{ p: 1.5 }}>
          <GraphicsCard sx={{ py: 3, borderRadius: 3, bgcolor: value, color }}>
            <Stack sx={{ gap: 0.75, alignItems: 'center' }}>
              <Typography variant="h3">{value}</Typography>
              <Typography>{figmaLabel}</Typography>
            </Stack>
          </GraphicsCard>
          <Stack direction="row" sx={{ justifyContent: 'space-between', mt: 1.5 }}>
            <Typography variant="subtitle1">{muiLabel}</Typography>
            <Typography sx={{ color: 'text.secondary' }}>{figmaValue}</Typography>
          </Stack>
        </Box>
      </GraphicsCard>
    </Grid>
  );
}

function ColorPalette({ title, palette }) {
  return (
    <Stack sx={{ gap: 3 }}>
      <Typography variant="h2">{title}</Typography>
      <Grid container spacing={{ xs: 1.5, sm: 3 }} sx={{ alignItems: 'center' }}>
        {palette.map((item, index) => (
          <ColorBox key={index} {...item} />
        ))}
      </Grid>
    </Stack>
  );
}

/***************************  SECTIONS - COLOR  ***************************/

/**
 *
 * Demos:
 * - [Color](https://www.Capitalta.io/sections/color)
 */

export default function Color() {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();

  const {
    state: { currentTheme }
  } = useConfig();
  const colorString = getColorString(currentTheme);

  const scheme = colorScheme ?? 'light';
  const schemeTheme = theme.colorSchemes?.[scheme];

  const currentPalette = schemeTheme ? schemeTheme.palette : theme.palette;

  const primaryPalette = [
    {
      value: currentPalette.primary.lighter,
      color: 'primary.darker',
      muiLabel: 'primary.lighter',
      figmaLabel: colorScheme === 'dark' ? 'Primary Container / On Primary Fixed Variant' : 'Primary Container / Primary Fixed',
      figmaValue: `${colorString}/primary/${getColorCode(currentTheme, 0, colorScheme)}` // setup swr and use function for dynamic value
    },
    {
      value: currentPalette.primary.light,
      color: 'primary.dark',
      muiLabel: 'primary.light',
      figmaLabel: 'Primary Fixed Dim',
      figmaValue: `${colorString}/primary/${getColorCode(currentTheme, 1, colorScheme)}`
    },
    {
      value: currentPalette.primary.main,
      color: 'background.default',
      muiLabel: 'primary.main',
      figmaLabel: 'Primary',
      main: true,
      figmaValue: `${colorString}/primary/${getColorCode(currentTheme, 2, colorScheme)}`
    },
    {
      value: currentPalette.primary.dark,
      color: 'primary.light',
      muiLabel: 'primary.dark',
      figmaLabel: colorScheme === 'dark' ? 'On Primary Container / Primary Fixed' : 'On Primary Fixed Variant',
      figmaValue: `${colorString}/primary/${getColorCode(currentTheme, 3, colorScheme)}`
    },
    {
      value: currentPalette.primary.darker,
      color: 'primary.lighter',
      muiLabel: 'primary.darker',
      figmaLabel: 'On Primary Container / On Primary Fixed',
      figmaValue: `${colorString}/primary/${getColorCode(currentTheme, 4, colorScheme)}`
    }
  ];

  const secondaryPalette = [
    {
      value: currentPalette.secondary.lighter,
      color: 'secondary.darker',
      muiLabel: 'secondary.lighter',
      figmaLabel: colorScheme === 'dark' ? 'Secondary Container / On Secondary Fixed Variant' : 'Secondary Container / Secondary Fixed',
      figmaValue: `${colorString}/secondary/${getColorCode(currentTheme, 0, colorScheme)}`
    },
    {
      value: currentPalette.secondary.light,
      color: 'secondary.dark',
      muiLabel: 'secondary.light',
      figmaLabel: 'Secondary Fixed Dim',
      figmaValue: `${colorString}/secondary/${getColorCode(currentTheme, 1, colorScheme)}`
    },
    {
      value: currentPalette.secondary.main,
      color: 'background.default',
      muiLabel: 'secondary.main',
      figmaLabel: 'Secondary',
      main: true,
      figmaValue: `${colorString}/secondary/${getColorCode(currentTheme, 2, colorScheme)}`
    },
    {
      value: currentPalette.secondary.dark,
      color: 'secondary.light',
      muiLabel: 'secondary.dark',
      figmaLabel: colorScheme === 'dark' ? 'On Secondary Container / Secondary Fixed' : 'On Secondary Fixed Variant',
      figmaValue: `${colorString}/secondary/${getColorCode(currentTheme, 3, colorScheme)}`
    },
    {
      value: currentPalette.secondary.darker,
      color: 'secondary.lighter',
      muiLabel: 'secondary.darker',
      figmaLabel: 'On Secondary Container / On Secondary Fixed',
      figmaValue: `${colorString}/secondary/${getColorCode(currentTheme, 4, colorScheme)}`
    }
  ];

  const greyPalette = [
    {
      value: currentPalette.grey[50],
      color: 'grey.900',
      muiLabel: 'grey.50',
      figmaLabel: colorScheme === 'dark' ? 'Surface / Surface Dim' : 'Surface / Surface Bright',
      figmaValue: `${colorString}/neutral/${getGreyCode(currentTheme, 0, colorScheme)}`
    },
    {
      value: currentPalette.grey[100],
      color: 'grey.900',
      muiLabel: 'grey.100',
      figmaLabel: 'Surface Container Low',
      figmaValue: `${colorString}/neutral/${getGreyCode(currentTheme, 1, colorScheme)}`
    },
    {
      value: currentPalette.grey[200],
      color: 'grey.900',
      muiLabel: 'grey.200',
      figmaLabel: 'Surface Container',
      figmaValue: `${colorString}/neutral/${getGreyCode(currentTheme, 2, colorScheme)}`
    },
    {
      value: currentPalette.grey[300],
      color: 'grey.900',
      muiLabel: 'grey.300',
      figmaLabel: 'Surface Container High',
      figmaValue: `${colorString}/neutral/${getGreyCode(currentTheme, 3, colorScheme)}`
    },
    {
      value: currentPalette.grey[400],
      color: 'grey.900',
      muiLabel: 'grey.400',
      figmaLabel: 'Surface Container Highest',
      figmaValue: `${colorString}/neutral/${getGreyCode(currentTheme, 4, colorScheme)}`
    },
    {
      value: currentPalette.grey[500],
      color: 'grey.900',
      muiLabel: 'grey.500',
      figmaLabel: 'Surface Container Highest',
      figmaValue: `${colorString}/neutral/${getGreyCode(currentTheme, 5, colorScheme)}`
    },
    {
      value: currentPalette.grey[600],
      color: 'grey.800',
      muiLabel: 'grey.600',
      figmaLabel: 'Outline Variant',
      figmaValue: `${colorString}/neutral variant/${getGreyCode(currentTheme, 6, colorScheme)}`
    },
    {
      value: currentPalette.grey[700],
      color: 'grey.600',
      muiLabel: 'grey.700',
      figmaLabel: 'Outline',
      figmaValue: `${colorString}/neutral variant/${getGreyCode(currentTheme, 7, colorScheme)}`
    },
    {
      value: currentPalette.grey[800],
      color: 'grey.600',
      muiLabel: 'grey.800',
      figmaLabel: 'On Surface Variant',
      figmaValue: `${colorString}/neutral variant/${getGreyCode(currentTheme, 8, colorScheme)}`
    },
    {
      value: currentPalette.grey[900],
      color: 'grey.50',
      muiLabel: 'grey.900',
      figmaLabel: 'On Surface',
      figmaValue: `${colorString}/neutral/${getGreyCode(currentTheme, 9, colorScheme)}`
    }
  ];

  const palettes = [
    { title: 'Primary', palette: primaryPalette },
    { title: 'Secondary', palette: secondaryPalette },
    { title: 'Neutral', palette: greyPalette }
  ];

  return (
    <Stack sx={{ gap: 6 }}>
      {palettes.map((palette, index) => (
        <ColorPalette key={index} {...palette} />
      ))}
    </Stack>
  );
}

ColorBox.propTypes = {
  value: PropTypes.string,
  color: PropTypes.string,
  muiLabel: PropTypes.string,
  figmaLabel: PropTypes.string,
  figmaValue: PropTypes.string,
  main: PropTypes.bool
};

ColorPalette.propTypes = { title: PropTypes.string, palette: PropTypes.array };
