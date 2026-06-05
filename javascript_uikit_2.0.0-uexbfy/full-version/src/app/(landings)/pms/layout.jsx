import PropTypes from 'prop-types';
// @next
import dynamic from 'next/dynamic';

// @project
import LandingPresentation from '@/components/LandingPresentation';

const ScrollFab = dynamic(() => import('@/components/ScrollFab'));
const PMSLayout = dynamic(() => import('@/views/landings/pms/layout'));

/***************************  LAYOUT - PMS  ***************************/

export default function PMS({ children }) {
  return (
    <PMSLayout>
      <>
        {children}

        {/* pre-built landings */}
        <LandingPresentation />

        {/* scroll to top section */}
        <ScrollFab />
      </>
    </PMSLayout>
  );
}

PMS.propTypes = { children: PropTypes.any };
