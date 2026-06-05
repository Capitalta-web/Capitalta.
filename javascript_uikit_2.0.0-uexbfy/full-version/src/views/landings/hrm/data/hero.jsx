// @mui
import Typography from '@mui/material/Typography';

export const hero = {
  chip: {
    label: <Typography sx={{ color: 'text.secondary' }}>✦&nbsp;&nbsp; HR Solutions Made Easy &nbsp;&nbsp;✦</Typography>
  },
  headLine: 'Simplify HR Tasks, Prioritize your Workforce',
  captionLine: 'Empower your HR team with our comprehensive platform for seamless HR management',
  primaryBtn: { children: 'Try predictive cost analytics', sx: { textTransform: 'none' } },
  image: { light: '/assets/images/graphics/hrm/desktop1-light.svg', dark: '/assets/images/graphics/hrm/desktop1-dark.svg' },
  listData: [
    { icon: 'tabler-settings-up', title: 'Automated scaling for efficiency' },
    { icon: 'tabler-chart-histogram', title: 'Real-time performance insights' }
  ]
};
