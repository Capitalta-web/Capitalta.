// @project
import { LANDING_PATH } from '@/path';

export const blog = {
  heading: 'Resource center',
  caption: 'Discover the features that will transform your customer relationships.',
  blogs: [
    {
      image: '/assets/images/crypto/blog/blog2.png',
      caption: 'Navigating the crypto landscape: A guide to wallet security',
      link: { href: `${LANDING_PATH.crypto}/blog-details` },
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Tricia Wolf', role: 'Content Strategy Lead' }
    },
    {
      image: '/assets/images/crypto/blog/blog6.png',
      caption: 'Crypto Wallet Essentials: What Every User Should Know',
      link: { href: `${LANDING_PATH.crypto}/blog-details` },
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'James Wilson', role: 'Sales Operations Manager' }
    }
  ]
};

export const blog3 = {
  blogs: [
    {
      image: '/assets/images/crypto/blog/blog1.png',
      caption: 'Navigating the crypto landscape: Wallet security',
      link: { href: `${LANDING_PATH.crypto}/blog-details`, scroll: false },
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Tricia Wolf', role: 'Direct Optimization Executive' }
    },
    {
      image: '/assets/images/crypto/blog/blog3.png',
      caption: 'Crypto wallet essentials: What every user should know',
      link: { href: `${LANDING_PATH.crypto}/blog-details`, scroll: false },
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'James Wilson', role: 'Sales Operations Manager' }
    },
    {
      image: '/assets/images/crypto/blog/blog4.png',
      caption: 'Maximize your trading potential with strategies',
      link: { href: `${LANDING_PATH.crypto}/blog-details`, scroll: false },
      profile: { avatar: '/assets/images/user/avatar4.png', name: 'Sydnie', role: 'Designer' }
    },
    {
      image: '/assets/images/crypto/blog/blog5.png',
      caption: 'The future of crypto wallets: What to expect',
      link: { href: `${LANDING_PATH.crypto}/blog-details`, scroll: false },
      profile: { avatar: '/assets/images/user/avatar3.png', name: 'Jone D', role: 'Digital Marketer' }
    },
    {
      image: '/assets/images/crypto/blog/blog6.png',
      caption: 'Decentralized finance: The future of our financial freedom',
      link: { href: `${LANDING_PATH.crypto}/blog-details`, scroll: false },
      profile: { avatar: '/assets/images/user/avatar6.png', name: 'Casey Brown', role: 'Business Analyst' }
    },
    {
      image: '/assets/images/crypto/blog/blog2.png',
      caption: `Navigating the crypto landscape: Beginner's guide.`,
      link: { href: `${LANDING_PATH.crypto}/blog-details`, scroll: false },
      profile: { avatar: '/assets/images/user/avatar5.png', name: 'Brian C.', role: 'Operations Lead' }
    }
  ]
};
