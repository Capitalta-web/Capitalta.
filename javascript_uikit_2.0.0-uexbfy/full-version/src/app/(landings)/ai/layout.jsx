import PropTypes from 'prop-types';
// @next
import dynamic from 'next/dynamic';

// @project
import LandingPresentation from '@/components/LandingPresentation';

const ScrollFab = dynamic(() => import('@/components/ScrollFab'));
const AILayout = dynamic(() => import('@/views/landings/ai/layout'));

/***************************  LAYOUT - AI  ***************************/

export default function AI({ children }) {
  return (
    <AILayout>
      <>
        {children}

        {/* pre-built landings */}
        <LandingPresentation />

        {/* scroll to top section */}
        <ScrollFab />
      </>
    </AILayout>
  );
}

AI.propTypes = { children: PropTypes.any };
