import PropTypes from 'prop-types';
// @next
import dynamic from 'next/dynamic';

// @project
import LandingPresentation from '@/components/LandingPresentation';

const ScrollFab = dynamic(() => import('@/components/ScrollFab'));
const CRMLayout = dynamic(() => import('@/views/landings/crm/layout'));

/***************************  LAYOUT - CRM  ***************************/

export default function CRM({ children }) {
  return (
    <CRMLayout>
      <>
        {children}

        {/* pre-built landings */}
        <LandingPresentation />

        {/* scroll to top section */}
        <ScrollFab />
      </>
    </CRMLayout>
  );
}

CRM.propTypes = { children: PropTypes.any };
