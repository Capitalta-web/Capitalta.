// @mui
import Typography from '@mui/material/Typography';

/***************************  CALL TO ACTION  - HEADLINE  ***************************/

function HeadlineText() {
  return (
    <Typography variant="h2">
      Start{' '}
      <Typography variant="h2" component="span" sx={{ color: 'primary.main' }}>
        your journey towards growth and success{' '}
      </Typography>
      with just a click
    </Typography>
  );
}

/***************************  CALL TO ACTION  - DATA  ***************************/

export const cta7 = {
  headLine: <HeadlineText />,
  primaryBtn: { children: 'Get Started - It’s Free' },
  caption: `Take advantage of our risk-free trial and see the difference for yourself.`
};

export const cta10 = {
  heading: 'Ready to get started?',
  caption: `Kickstart your journey towards success – click below to get started now.`,
  primaryBtn: { children: 'Get started today' },
  secondaryBtn: { children: 'Explore Feature' },
  image: { light: '/assets/images/graphics/pms/graphics1-light.svg', dark: '/assets/images/graphics/pms/graphics1-dark.svg' },
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' },
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: '10k+ Reviews (4.5 out of 5)'
  },
  list: [
    {
      icon: 'tabler-credit-card',
      primary: `No credit card required`
    },
    {
      icon: { name: 'tabler-history', size: 22 },
      primary: '14-day free trial'
    }
  ]
};
