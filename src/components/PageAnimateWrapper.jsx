'use client';
import PropTypes from 'prop-types';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';

// @project
import { varSlide } from '@/components/third-party/motion/animate/dialog';

/***************************  ANIMATION - WRAPPER  ***************************/

export default function PageAnimateWrapper({ children }) {
  // Next.js hook instead of react-router-dom
  const pathname = usePathname();

  // Use pathname as key so animation re-runs on every route change
  const outletKey = pathname;

  return (
    <motion.div key={outletKey} variants={varSlide('slideInDown', { distance: 50 })} initial="initial" animate="animate">
      {children}
    </motion.div>
  );
}

PageAnimateWrapper.propTypes = { children: PropTypes.any };
