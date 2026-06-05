// @project
import { Login3 } from '@/blocks/auth/login';

/***************************  LOGIN 3 - DATA  ***************************/

const data = {
  heading: 'Sign In',
  caption: 'Start your 30-day free trial'
};

/***************************  BLOCK - LOGIN 3  ***************************/

export default function BlockLogin3() {
  return <Login3 {...data} />;
}
