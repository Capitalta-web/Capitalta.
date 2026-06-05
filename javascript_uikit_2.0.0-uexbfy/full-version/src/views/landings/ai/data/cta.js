// @project
import { FREEBIES_URL } from '@/path';

export const cta = {
  bgImage: '/assets/images/ai/background1.svg',
  heading: 'Maximize efficiency and productivity with our comprehensive AI solution',
  primaryBtn: { children: 'Get Started - It’s Free Now', href: FREEBIES_URL, target: '_blank', rel: 'noopener noreferrer' }
};

export const cta9 = {
  heading: 'Your future is AI-powered.',
  caption: 'Discover how AI Assistant can optimize your workflows and automate tasks.',
  image: { light: '/assets/images/ai/graphics/graphics6-light.svg', dark: '/assets/images/ai/graphics/graphics6-dark.svg' },
  primaryBtn: { children: 'Try for Free', sx: { textTransform: 'none' } }
};

export const cta11 = {
  heading: 'AI assistant app',
  caption: 'Bring your personal AI anywhere. Get productivity gains, research assistance, and automation with our mobile AI Assistant app.',
  primaryBtn: { children: 'App Store', startIcon: 'tabler-brand-apple' },
  secondaryBtn: { children: 'Google Play', startIcon: 'tabler-brand-google-play' },
  image: { light: '/assets/images/ai/graphics/graphics5-light.svg', dark: '/assets/images/ai/graphics/graphics5-dark.svg' }
};
