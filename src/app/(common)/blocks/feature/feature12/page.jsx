// @project
import { Feature12 } from '@/blocks/feature';

/***************************  FEATURE 12 - DATA  ***************************/

const data = {
  heading: 'Robust uncommon functionality',
  caption: 'Experience a platform with features that redefine the norm.',
  heading2: 'Integration with exchanges',
  caption2: 'Ability to link with cryptocurrency exchanges for trading. Secure backup options for private keys.',
  image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' },
  icon: 'tabler-brand-apple',
  icon2: 'tabler-brand-google-play',
  primaryBtn: { children: 'Install Now' },
  primaryBtn2: { children: 'Install Now' },
  features: [
    {
      icon: 'custom-lock',
      title: 'Security features',
      content: 'Encryption and secure key management. Two-factor authentication (2FA) for additional security.'
    },
    {
      icon: 'custom-coin',
      title: 'Multi-currency support',
      content: 'Capability to store and manage various cryptocurrencies. Biometric authentication (fingerprint, face recognition).'
    },
    {
      icon: 'custom-data',
      title: 'Real-time market data',
      content: 'Display of real-time cryptocurrency market prices. Conveniently scan QR codes for transactions.'
    },
    {
      icon: 'custom-data-switch',
      title: 'Offline storage (Cold wallet)',
      content: 'Accessible through various devices, such as desktop and hardware wallets.Option for offline storage to enhance security.'
    }
  ]
};

/***************************  BLOCK - FEATURE 12  ***************************/

export default function BlockFeature12() {
  return <Feature12 {...data} />;
}
