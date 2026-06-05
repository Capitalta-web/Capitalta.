// @next
import { NextLink } from '@/components/routes';

// @project
import SvgIcon from '@/components/SvgIcon';
import { LANDING_PATH } from '@/path';

export const cta = {
  bgImage: '/assets/images/crypto/banner1.png',
  heading: 'Join our blockchain community today!',
  caption: `Unlock endless possibilities by joining our thriving blockchain community. Whether you're new to the space or an experienced professional.`,
  primaryBtn: { children: 'Get Started', component: NextLink, href: '#', scroll: false }
};

export const cta1 = {
  bgImage: '/assets/images/crypto/banner1.png',
  heading: 'Secure your assets and dive into the future – Download coinomi wallet now!',
  primaryBtn: {
    children: 'Install Now',
    component: NextLink,
    scroll: false,
    href: '#',
    startIcon: <SvgIcon name="tabler-brand-google-play" size={16} color="background.default" />
  }
};

export const cta12 = {
  heading: 'Access top-tier tools through our interface',
  caption: 'Discover the features that will transform your customer relationships.',
  primaryBtn: { children: 'Explore Features', component: NextLink, href: `${LANDING_PATH.crypto}/feature` },
  image: { light: '/assets/images/crypto/graphics/graphic1-light.svg', dark: '/assets/images/crypto/graphics/graphic1-dark.svg' }
};

export const cta2 = {
  bgImage: '/assets/images/crypto/banner1.png',
  heading: 'Still have questions in mind?',
  caption: 'Feel free to reach out to our support team for personalized assistance.',
  primaryBtn: { children: 'Contact us', component: NextLink, href: '#', scroll: false, sx: { textTransform: 'none' } }
};
