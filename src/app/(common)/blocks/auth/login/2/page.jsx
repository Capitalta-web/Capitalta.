// @project
import { Login2 } from '@/blocks/auth/login';

/***************************  LOGIN 2 - DATA  ***************************/

const data = {
  heading: 'Sign In',
  caption: 'Start your 30-day free trial',
  image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' }
};

/***************************  BLOCK - LOGIN 2  ***************************/

export default function BlockLogin2() {
  return <Login2 {...data} />;
}
