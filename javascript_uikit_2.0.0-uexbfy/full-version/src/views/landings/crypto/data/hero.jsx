'use client';

// @mui
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';

/***************************  HERO - HEADLINE  ***************************/

function HeadlineText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
        delay: 0.4,
        ease: [0.215, 0.61, 0.355, 1]
      }}
    >
      <Typography variant="h1">The Ultimate All → in → One Decentralized Wallet for Quick Transactions</Typography>
    </motion.div>
  );
}

/***************************  HERO - DATA  ***************************/

export const hero = {
  headLine: <HeadlineText />,
  boxImage1: { light: '/assets/images/crypto/dashboard1-light.svg', dark: '/assets/images/crypto/dashboard1-dark.svg' },
  boxImage2: { light: '/assets/images/crypto/dashboard1-light.svg', dark: '/assets/images/crypto/dashboard1-dark.svg' },
  boxImage3: { light: '/assets/images/crypto/dashboard1-light.svg', dark: '/assets/images/crypto/dashboard1-dark.svg' },
  description: 'Empowering Businesses with a Customizable, Data-Driven CRYPTO Solution.',
  listData: [
    { title: 'Deposit', link: { href: '#', scroll: false } },
    { title: 'Transfer', link: { href: '#', scroll: false } },
    { title: 'Wallet Management', link: { href: '#', scroll: false } }
  ],
  exploreBtn: { children: 'Explore' }
};
