// @project
import branding from '@/branding.json';
import { Cta11 } from '@/blocks/cta';

/***************************  BLOCK - CALL TO ACTION 11  ***************************/

export default function BlockCta11() {
  const data = {
    heading: `Secure data ecosystem with ${branding.brandName}`,
    caption: 'Collaborate confidently with granular access controls and regulatory compliance.',
    primaryBtn: { children: 'Secure' },
    secondaryBtn: { children: 'Set Up' },
    image: { light: '/assets/images/graphics/ai/graphics7-light.svg', dark: '/assets/images/graphics/ai/graphics7-dark.svg' },
    list: [
      { primary: `Fortress for your data` },
      { primary: 'Granular access controls' },
      { primary: 'Automated backup solutions' },
      { primary: 'Ensured regulatory compliance' }
    ]
  };

  return <Cta11 {...data} />;
}
