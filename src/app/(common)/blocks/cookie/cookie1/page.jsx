// @project
import { Cookie1 } from '@/blocks/cookie';

/***************************  COOKIE 1 - DATA  ***************************/

const data = {
  cookie: {
    caption: 'We use cookies to personalize your experience. By continuing to visit this website you agree to our use of cookies.',
    link: { children: 'Learn More', href: '#' }
  },
  heading: 'We use cookies',
  primaryBtn: { children: 'Reject' },
  secondaryBtn: { children: 'Accept' }
};

/***************************  BLOCK - COOKIE 1  ***************************/

export default function BlockCookie1() {
  return <Cookie1 {...data} />;
}
