// @project
import GraphicsImage from '@/components/GraphicsImage';
import GetImagePath from '@/utils/GetImagePath';

export const feature10 = {
  heading: 'Earn weekly & Monthly rewards',
  caption: 'Upon signing up, earn rewards by completing the courses below',
  features: [
    {
      icon: 'custom-wallet',
      title: 'Create a wallet',
      content: 'Create or connect a wallet by installing the app.'
    },
    {
      icon: 'custom-debitcard',
      title: 'Deposit assets to a wallet',
      content: 'Transfer your digital assets to your wallet easily and quickly. '
    },
    {
      icon: 'custom-doller',
      title: 'Hold the assets to wallet',
      content: 'Store your digital assets safely and securely, allowing you the freedom.'
    },
    {
      icon: 'custom-celebration',
      title: 'More points on ref. codes',
      content: 'When your friends enter their referral codes,they will earn points for them.'
    }
  ],
  video: {
    thumbnail: '/assets/images/crypto/banner2.png',
    src: '/assets/videos/test.mp4',
    overlay: false
  }
};

export const feature12 = {
  heading: 'Robust uncommon functionality',
  caption: 'Experience a platform with features that redefine the norm.',
  heading2: 'Integration with exchanges',
  caption2: 'Ability to link with cryptocurrency exchanges for trading. Secure backup options for private keys.',
  image: {
    light: '/assets/images/crypto/graphics/graphic9-light.png',
    dark: '/assets/images/crypto/graphics/graphic9-dark.png'
  },
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
      content: 'Display of real-time cryptocurrency market prices.Conveniently scan QR codes for transactions.'
    },
    {
      icon: 'custom-data-switch',
      title: 'Offline storage (Cold Wallet)',
      content: 'Accessible through various devices, such as desktop and hardware wallets.Option for offline storage to enhance security'
    }
  ]
};

function ImageContent1() {
  return (
    <GraphicsImage
      sx={{
        height: { xs: 70, md: 106 },
        backgroundSize: 'contain',
        mx: { xs: 0.5, sm: 1, md: 1.5 }
      }}
      image={GetImagePath({
        light: '/assets/images/crypto/graphics/graphic6-light.svg',
        dark: '/assets/images/crypto/graphics/graphic6-dark.svg'
      })}
    />
  );
}

function ImageContent2() {
  return (
    <GraphicsImage
      sx={{
        height: { xs: 70, md: 106 },
        backgroundSize: 'contain',
        mx: { xs: 0.5, sm: 1, md: 1.5 }
      }}
      image={GetImagePath({
        light: '/assets/images/crypto/graphics/graphic5-light.svg',
        dark: '/assets/images/crypto/graphics/graphic5-dark.svg'
      })}
    />
  );
}

export const feature19 = {
  blockData1: {
    actionBtn: { children: 'Learn More' },
    image: { dark: '/assets/images/crypto/graphics/graphic2-dark.svg', light: '/assets/images/crypto/graphics/graphic2-light.svg' },
    title: 'High-level security standards',
    description: 'Quickly respond to shifting needs, improve workflows, and drive productivity.'
  },
  blockData2: {
    actionBtn: { children: 'Learn More' },
    image: { dark: '/assets/images/crypto/graphics/graphic3-dark.svg', light: '/assets/images/crypto/graphics/graphic3-light.svg' },
    title: 'Transparent insights and metrics',
    description: 'Understand workflows to drive ongoing enhancements.'
  },
  blockData3: { description: 'Enjoy fast, low-fee transactions with blockchain technology.', image: <ImageContent1 /> },
  blockData4: { description: 'Optimize your asset management with secure, intuitive platform.', image: <ImageContent2 /> }
};
