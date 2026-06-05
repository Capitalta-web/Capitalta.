import PropTypes from 'prop-types';
// @next
import dynamic from 'next/dynamic';

// @project
import LandingPresentation from '@/components/LandingPresentation';

const ScrollFab = dynamic(() => import('@/components/ScrollFab'));
const CryptoLayout = dynamic(() => import('@/views/landings/crypto/layout'));

/***************************  LAYOUT - CRYPTO  ***************************/

export default function Crypto({ children }) {
  return (
    <CryptoLayout>
      <>
        {children}

        {/* pre-built landings */}
        <LandingPresentation />

        {/* scroll to top section */}
        <ScrollFab />
      </>
    </CryptoLayout>
  );
}

Crypto.propTypes = { children: PropTypes.any };
