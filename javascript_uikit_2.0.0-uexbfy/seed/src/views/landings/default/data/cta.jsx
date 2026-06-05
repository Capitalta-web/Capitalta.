// @mui
import branding from '@/branding.json';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

// @project
import { NextLink } from '@/components/routes';

export const cta4 = {
  headLine: 'Why trust Phoenixcoded for your dashboard template needs?',
  primaryBtn: {
    children: 'Read Our story',
    href: 'https://blog.saasable.io/a-decade-of-expertise-the-phoenixcoded-story-and-why-you-should-trust-us',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' },
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: '250+ Author Reviews (4.65 out of 5)'
  },
  list: [
    { primary: '10+ Years expertise' },
    { primary: '8k+ Satisfied customers' },
    { primary: 'Elite envato author' },
    { primary: 'Timely support, Guaranteed' },
    { primary: 'Regular updates provided' },
    { primary: 'Proven industry l eader' }
  ],
  clientContent: 'Learn More'
};

function DescriptionLine() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      Have questions? Our community is here to help. Learn more about{' '}
      <Link component={NextLink} variant="caption2" color="primary" href={branding.company.socialLink.discord} underline="hover">
        our community
      </Link>
    </Typography>
  );
}

export const cta5 = {
  label: 'Join the Community',
  heading: 'Connect with us on discord',
  caption: 'Get support, share insights, and grow together.',
  primaryBtn: {
    children: 'Join Discord Community',
    href: branding.company.socialLink.discord,
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  description: <DescriptionLine />,
  saleData: { count: 10, defaultUnit: 'k+', caption: 'Trusted by professionals worldwide' },
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' },
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: '300+ Reviews (4.65 out of 5)'
  }
};

export const cta10 = {
  heading: "Couldn't find the perfect role for you?",
  caption: 'No worries – we encourage you to apply anyway! Your unique skills and talents might be just what we need.',
  primaryBtn: { children: 'Send your Resume', href: '#', sx: { textTransform: 'none' } },
  secondaryBtn: { children: 'Contact us', href: '/contact', sx: { textTransform: 'none' } },
  image: { light: '/assets/images/graphics/ai/graphics15-light.svg', dark: '/assets/images/graphics/ai/graphics15-dark.svg' },
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
      btn: { children: 'View Job', href: '#' }
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
      btn: { children: 'View Job', href: '#' }
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
      btn: { children: 'View Job', href: '#' }
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
      btn: { children: 'View Job', href: '#' }
    }
  ]
};
