import PropTypes from 'prop-types';
// @next
import dynamic from 'next/dynamic';

// @project
import LandingPresentation from '@/components/LandingPresentation';

const ScrollFab = dynamic(() => import('@/components/ScrollFab'));
const HRMLayout = dynamic(() => import('@/views/landings/hrm/layout'));

/***************************  LAYOUT - HRM  ***************************/

export default function HRM({ children }) {
  return (
    <HRMLayout>
      <>
        {children}

        {/* pre-built landings */}
        <LandingPresentation />

        {/* scroll to top section */}
        <ScrollFab />
      </>
    </HRMLayout>
  );
}

HRM.propTypes = { children: PropTypes.any };
