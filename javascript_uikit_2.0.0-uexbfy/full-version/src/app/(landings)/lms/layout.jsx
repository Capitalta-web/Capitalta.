import PropTypes from 'prop-types';
// @next
import dynamic from 'next/dynamic';

// @project
import LandingPresentation from '@/components/LandingPresentation';

const ScrollFab = dynamic(() => import('@/components/ScrollFab'));
const LMSLayout = dynamic(() => import('@/views/landings/lms/layout'));

/***************************  LAYOUT - LMS  ***************************/

export default function LMS({ children }) {
  return (
    <LMSLayout>
      <>
        {children}

        {/* pre-built landings */}
        <LandingPresentation />

        {/* scroll to top section */}
        <ScrollFab />
      </>
    </LMSLayout>
  );
}

LMS.propTypes = { children: PropTypes.any };
