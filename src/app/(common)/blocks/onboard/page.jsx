// @project
import branding from '@/branding.json';
import OnboardPage from '@/blocks/Onboard';

/***************************  ONBOARD - DATA  ***************************/

const data = {
  heading: 'Glad to Have You Onboard!',
  caption: `Thank you for joining the ${branding.brandName} family! While you wait for warly access, Check out our community or dive into our UI kit.`,
  primaryBtn: { children: 'Explore UI kit' },
  secondaryBtn: { children: 'Join our Community', sx: { textTransform: 'none' } }
};

/***************************  BLOCK - ONBOARD  ***************************/

export default function BlockOnBoardPage() {
  return <OnboardPage {...data} />;
}
