// @mui
import Typography from '@mui/material/Typography';

// @project
import { FREEBIES_URL } from '@/path';
import { DynamicComponentType } from '@/enum';

/***************************  CALL TO ACTION 7 - HEADLINE  ***************************/

function HeadlineText() {
  return (
    <Typography variant="h2">
      Explore parallel processing with CRM.{' '}
      <Typography variant="h2" component="span" sx={{ color: 'primary.main' }}>
        Transform your data experience now!
      </Typography>
    </Typography>
  );
}

/***************************  HERO - DATA  ***************************/

export const cta = {
  bgImage: '/assets/images/crm/background1.svg',
  heading: 'Try our services risk-free with a trial, including migration assistance and support',
  primaryBtn: {
    children: 'Begin immediately, at no cost!',
    href: FREEBIES_URL,
    target: '_blank',
    rel: 'noopener noreferrer',
    sx: { textTransform: 'none' }
  }
};

export const cta10 = {
  heading: `Couldn't find the perfect role for you?`,
  caption: 'No worries – we encourage you to apply anyway! Your unique skills and talents might be just what we need.',
  primaryBtn: { children: 'Send Your Resume' },
  image: { light: '/assets/images/crm/graphics/graphics4-light.svg', dark: '/assets/images/crm/graphics/graphics4-dark.svg' },
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' },
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: '250+ Employees Trust Us'
  }
};

export const cta13 = {
  heading: 'Join a winning team',
  caption: 'Be a part of a winning culture that fosters collaboration, creativity, and success in every career path',
  listData: [
    {
      title: 'Product Design',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: 'Remote'
        },
        {
          icon: 'tabler-history',
          name: 'Full-Time'
        }
      ],
      btn: { children: 'View Job' }
    },
    {
      title: 'Front-End Developer',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: 'Remote'
        },
        {
          icon: 'tabler-history',
          name: 'Full-Time'
        }
      ],
      btn: { children: 'View Job' }
    },
    {
      title: 'Back-End Developer',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: 'Remote'
        },
        {
          icon: 'tabler-history',
          name: 'Full-Time'
        }
      ],
      btn: { children: 'View Job' }
    },
    {
      title: 'Scrum Master',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: 'Remote'
        },
        {
          icon: 'tabler-history',
          name: 'Full-Time'
        }
      ],
      btn: { children: 'View Job' }
    }
  ]
};

export const cta7 = {
  headLine: <HeadlineText />,
  primaryBtn: { children: '30 Day free trial', sx: { textTransform: 'none' } },
  caption: `Outstanding customer support! They're responsive and go above and beyond to ensure a smooth experience. `
};

export const cta6 = {
  heading: 'Trusted by 80000+ businesses',
  caption: 'Collaborate confidently with granular access controls and regulatory compliance. ',
  primaryBtn: { children: 'Get Started' },
  clienteleList: [
    { image: { component: 'clientele/Techlify', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Marketly', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Financely', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE } }
  ]
};
