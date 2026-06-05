// @project
import OtpVerification from '@/blocks/auth/OtpVerification';

/***************************  OTP VERIFICATION - DATA  ***************************/

const data = {
  heading: 'OTP Verification',
  caption: { text: 'Please enter the 6 digit code sent to', email: 'example@gmail.com' }
};

/***************************  BLOCK - OTP VERIFICATION  ***************************/

export default function BlockOtpVerification() {
  return <OtpVerification {...data} />;
}
