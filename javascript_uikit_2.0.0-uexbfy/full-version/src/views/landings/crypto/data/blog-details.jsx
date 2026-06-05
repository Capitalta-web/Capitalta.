// @project
import branding from '@/branding.json';

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

export const blogDetails = {
  date: '24 May 2024 · Design · 10 Min Read',
  heading: 'Navigating the crypto landscape: Wallet security',
  image: {
    src: '/assets/images/user/avatar5.png',
    name: 'Tricia Yundt',
    role: 'Project Manager'
  },
  socialIcons: [
    {
      icon: 'tabler-filled-linkedin',
      link: { href: `${branding.company.socialLink.linkedin}`, ...linkProps }
    },
    {
      icon: 'tabler-filled-facebook',
      link: { href: `${branding.company.socialLink.facebook}`, ...linkProps }
    },
    {
      icon: 'tabler-filled-youtube',
      link: { href: `${branding.company.socialLink.youtube}`, ...linkProps }
    },
    {
      icon: 'tabler-filled-brand-github',
      link: { href: `${branding.company.socialLink.github}`, ...linkProps }
    },
    {
      icon: 'tabler-filled-dribble',
      link: { href: `${branding.company.socialLink.dribble}`, ...linkProps }
    }
  ],
  mainImage: '/assets/images/crypto/blog/blog1.png',
  title: 'What is a Crypto Wallet?',
  description:
    'A crypto wallet is a digital tool that allows users to store and manage their cryptocurrencies. It doesn’t actually store coins but instead holds the private keys that grant access to your assets on the blockchain.',

  subTitle: 'Best practices for wallet security',
  blogDetails: [
    {
      title: 'Use a hardware wallet',
      content: (
        <>
          When it comes to crypto security, hardware wallets are considered the gold standard. These are physical devices that store your
          private keys offline, making them immune to most online threats like malware, phishing, or remote hacks.
          <br />
          <br />
          Unlike software wallets (hot wallets), which are connected to the internet and thus more vulnerable, hardware wallets are cold
          storage solutions. They only connect to your device temporarily when you need to make a transaction—and even then, the private
          keys never leave the device.
        </>
      ),
      heading1: 'Popular Hardware Wallets:',
      dotList: [
        { description: 'Ledger Nano S/X' },
        { description: 'Trezor Model One/Model T' },
        { description: 'BitBox02' },
        { description: 'Keystone Pro' }
      ]
    },
    {
      title: 'Enable two-factor authentication',
      content: (
        <>
          Two-Factor Authentication (2FA) is a simple yet powerful layer of security that significantly reduces the risk of unauthorized
          access to your crypto accounts and wallets. It requires users to provide two forms of identification before granting
          access—typically your password (something you know) and a temporary code from a second device (something you have).
        </>
      ),
      dotList: [
        {
          title: 'Authenticator apps (Recommended):',
          description:
            'Use apps like Google Authenticator, Authy, or Microsoft Authenticator to generate time-based one-time passwords (TOTP).'
        },
        {
          title: 'SMS-based 2FA:',
          description:
            "A code sent to your mobile number. This is better than nothing, but vulnerable to SIM-swapping attacks, so it's not ideal."
        },
        {
          title: 'Hardware 2FA keys:',
          description: 'Physical devices like YubiKey offer strong protection and are often used in high-security environments.'
        }
      ]
    },
    {
      title: 'Backup your recovery phrase',
      content: (
        <>
          Your recovery phrase—also known as a seed phrase or mnemonic phrase—is the most critical piece of information for accessing your
          cryptocurrency wallet. It’s typically a set of 12 to 24 randomly generated words, created when you first set up your wallet. This
          phrase can fully restore your wallet and all the funds it controls.
          <br />
          <br />
          If someone else gets access to your recovery phrase, they can steal your crypto. If you lose it, you lose access forever. There’s
          no &quot;forgot password&quot; in blockchain.
        </>
      )
    },
    {
      title: 'Update regularly',
      content: (
        <>
          In the crypto world, staying up to date isn&apos;t optional—it&apos;s essential. Whether you’re using a hardware wallet, mobile
          app, desktop software, or browser extension, keeping your tools updated ensures you’re protected against known vulnerabilities,
          bugs, and exploits.
          <br />
          Hackers often target outdated wallet apps and systems because they know exactly where the weaknesses lie. Developers regularly
          release updates that patch security flaws, improve performance, and add new protections.
        </>
      )
    },
    {
      title: 'Avoid sharing sensitive info',
      content: (
        <>
          In the decentralized world of crypto, you are your own bank—and that comes with serious responsibility. Unlike traditional
          finance, there’s no customer service to undo a mistake or recover lost funds. Once sensitive information is exposed, your assets
          are at risk.
          <br />
          <br />
        </>
      ),

      heading1: 'These are the keys to your digital vault. Never share:',
      dotList: [
        { description: 'Seed Phrase / Recovery phrase' },
        { description: 'Private keys' },
        { description: 'Wallet PIN or password' },
        { description: 'Exchange login credentials' },
        { description: 'Transaction details with personal wallet addresses' },
        { description: 'Email addresses tied to crypto accounts' }
      ],
      heading2: 'If anyone gains access to your private key or recovery phrase, they can empty your wallet instantly—',
      title1: 'no approval or password required.'
    }
  ]
};
