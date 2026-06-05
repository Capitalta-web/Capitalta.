// @project
import ForgotPassword from '@/blocks/auth/ForgotPassword';

/***************************  FORGOT PASSWORD - DATA  ***************************/

const data = {
  heading: 'Forgot Password',
  caption: 'Enter the email associated with your account and we will send email with instruction to reset password.'
};

/***************************  BLOCK - FORGOT PASSWORD  ***************************/

export default function BlockForgotPassword() {
  return <ForgotPassword {...data} />;
}
