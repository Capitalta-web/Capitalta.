import { LANDING_PATH } from '@/path';

/***************************  DEFAULT - NAVBAR  ***************************/

export const navbar = {
  customization: true,
  landingBaseUrl: LANDING_PATH.lms,
  primaryBtn: { children: 'Try free now' },
  animated: true,
  navItems: [
    { id: 'about-us', title: 'About us', link: `${LANDING_PATH.lms}/about` },
    { id: 'courses', title: 'Courses', link: `${LANDING_PATH.lms}/courses` },
    { id: 'blog', title: 'Blog', link: `${LANDING_PATH.lms}/blog` },
    { id: 'contact', title: 'Contact Us', link: `${LANDING_PATH.lms}/contact` },
    { id: 'faq', title: 'FAQ', link: `${LANDING_PATH.lms}/faq` }
  ]
};
