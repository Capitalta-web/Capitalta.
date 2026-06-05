// @mui
import Typography from '@mui/material/Typography';

/***************************  CALL TO ACTION - HEADLINE  ***************************/

function HeadlineText() {
  return (
    <Typography variant="h2">
      Join thousands of successful businesses -{' '}
      <Typography variant="h2" component="span" sx={{ color: 'primary.main' }}>
        Activate your conversion toolkit
      </Typography>
    </Typography>
  );
}

/***************************  CALL TO ACTION - DATA  ***************************/

export const cta4 = {
  headLine: <HeadlineText />,
  primaryBtn: { children: 'Get Started' },
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
  list: [{ primary: `Enhanced customer satisfaction` }, { primary: 'Boosted conversions' }],
  clientContent: '300+ Client trust us'
};

export const cta5 = {
  heading: `Get started with our platform today`,
  caption: 'Take control of your success - Get started with our conversion-boosting tools',
  label: 'Join Community',
  input: {
    adornmentBtn: { children: 'Get Started' },
    helpertext: '1 email per week. No spam. Ever. Unsubscribe anytime'
  },
  saleData: { count: 10, defaultUnit: 'X', caption: 'Enhanced customer satisfaction and boosted conversions' },
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' },
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: '10k+ Reviews (4.5 out of 5)'
  }
};
