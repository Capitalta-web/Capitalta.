// @project
import Register from '@/blocks/auth/Register';

/***************************  REGISTER - DATA  ***************************/

const data = {
  heading: 'Crear Cuenta',
  caption: 'Regístrate para acceder a todos los servicios de Capitalta',
  loginLink: '/auth/login'
};

/***************************  PAGE - REGISTER  ***************************/

export const metadata = {
  title: 'Crear Cuenta | Capitalta'
};

export default function RegisterPage() {
  return <Register {...data} />;
}
