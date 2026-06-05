// @project
import { Cookie3 } from '@/blocks/cookie';

/***************************  COOKIE 3 - DATA  ***************************/

const data = {
  cookie: {
    caption: 'We use cookies to personalize your experience. By continuing to visit this website you agree to our use of cookies.',
    link: { children: 'Learn More', href: '#' }
  },
  heading: 'We use cookies',
  primaryBtn: { children: 'Reject' },
  secondaryBtn: { children: 'Accept' }
};

/***************************  BLOCK - COOKIE 3  ***************************/

export default function BlockCookie3() {
  return <Cookie3 {...data} />;
}
