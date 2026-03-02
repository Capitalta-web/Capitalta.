// @project
import { Login1 } from '@/blocks/auth/login';

/***************************  LOGIN - DATA  ***************************/

const data = {
  heading: 'Iniciar Sesión',
  caption: 'Bienvenido de nuevo a Capitalta',
  signupLink: '/auth/signup'
};

/***************************  PAGE - LOGIN  ***************************/

export const metadata = {
  title: 'Iniciar Sesión | Capitalta'
};

export default function LoginPage() {
  return <Login1 {...data} />;
}
