// @project
import branding from '@/branding.json';
import EarlyaccessPage from '@/blocks/EarlyAccess';

/***************************  EARLY ACCESS - DATA  ***************************/

const data = {
  heading: 'Be the first to try',
  caption: `Experience website publishing directly from ${branding.brandName} before anyone else!`,
  image: { light: '/assets/images/graphics/ai/graphics6-light.svg', dark: '/assets/images/graphics/ai/graphics6-dark.svg' },
  primaryBtn: { children: 'Let me in!', sx: { textTransform: 'none' } }
};

/***************************  BLOCK - EARLY ACCESS  ***************************/

export default function BlockEarlyAccessPage() {
  return <EarlyaccessPage {...data} />;
}
