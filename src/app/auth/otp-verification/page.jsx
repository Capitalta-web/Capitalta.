// @project
import OtpVerification from '@/blocks/auth/OtpVerification';

/***************************  OTP VERIFICATION - DATA  ***************************/

const data = {
  heading: 'Verifica tu Email',
  caption: {
    text: 'Ingresa el código de 6 dígitos que enviamos a',
    email: 'tu correo electrónico'
  }
};

/***************************  PAGE - OTP VERIFICATION  ***************************/

export const metadata = {
  title: 'Verificar Email | Capitalta'
};

export default function OtpVerificationPage() {
  return <OtpVerification {...data} />;
}
