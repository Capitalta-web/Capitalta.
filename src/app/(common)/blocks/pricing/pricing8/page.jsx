// @mui
import Typography from '@mui/material/Typography';

// @project
import { Pricing8 } from '@/blocks/pricing';

/***************************  PRICING 8 - DATA  ***************************/

function QuantityTitle() {
  return (
    <Typography sx={{ maxWidth: '80%' }}>
      Number of{' '}
      <Typography component="span" sx={{ color: 'primary.main' }}>
        idea{' '}
      </Typography>
      &{' '}
      <Typography component="span" sx={{ color: 'primary.main' }}>
        collabration
      </Typography>
    </Typography>
  );
}

const data = {
  heading: 'Get started with right plan',
  caption: 'All paid plan come with a 15-day money back guarantee',
  defaultUnit: 'monthly',
  user: 'Best for 1-50 users',
  features: [
    { id: 1, label: 'Unlimited members' },
    { id: 2, label: '250 issues' },
    { id: 3, label: 'Import and export' },
    { id: 4, label: 'All intergation, API, Webhooks' },
    { id: 5, label: '250 issues' },
    { id: 6, label: 'Import and export' },
    { id: 7, label: 'All intergation, API, Webhooks' }
  ],
  plans: [
    {
      title: 'Free plan',
      description: 'Get to know ideabuddy, choose a plan later',
      price: 0,
      quantityTitle: <Typography sx={{ textAlign: 'center' }}>Idea & collabration</Typography>,
      exploreLink: { children: 'Start for free', sx: { textTransform: 'none' } },
      featureTitle: 'Free features',
      featuresID: [1, 2, 3, 4]
    },
    {
      title: 'Dreamer',
      description: 'Get to know ideabuddy, choose a plan later',
      price: 29,
      count: 1,
      quantityTitle: <QuantityTitle />,
      exploreLink: { children: 'Choose Plan' },
      featureTitle: 'Features included',
      featuresID: [1, 2, 3, 4, 5, 6]
    },
    {
      title: 'Founder',
      description: 'Get to know ideabuddy, choose a plan later',
      price: 49,
      count: 3,
      active: 'POPULAR',
      quantityTitle: <QuantityTitle />,
      exploreLink: { children: 'Choose Plan' },
      featureTitle: 'Premium features',
      featuresID: [1, 2, 3, 4, 6, 7]
    },
    {
      title: 'Team pro',
      description: 'Get to know ideabuddy, choose a plan later',
      price: 99,
      count: 10,
      quantityTitle: <QuantityTitle />,
      exploreLink: { children: 'Choose Plan' },
      featureTitle: 'Extended features',
      featuresID: [1, 2, 3, 4, 5, 6, 7]
    }
  ]
};

/***************************  BLOCK - PRICING 8  ***************************/

export default function BlockPricing8() {
  return <Pricing8 {...data} />;
}
