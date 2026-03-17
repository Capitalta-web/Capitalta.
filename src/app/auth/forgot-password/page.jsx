import ForgotPassword from '@/blocks/auth/ForgotPassword';

export const metadata = {
  title: 'Recuperar contraseña | Capitalta'
};

const data = {
  heading: 'Recuperar contraseña',
  caption: 'Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.'
};

export default function ForgotPasswordPage() {
  return <ForgotPassword {...data} />;
}

