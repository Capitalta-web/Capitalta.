import PropTypes from 'prop-types';
// @next
import dynamic from 'next/dynamic';

// @project
// import LandingPresentation from '@/components/LandingPresentation';

const ScrollFab = dynamic(() => import('@/components/ScrollFab'));
const MainLayout = dynamic(() => import('@/views/landings/default/layout'));

/***************************  LAYOUT - DEFAULT  ***************************/

export default function Default({ children }) {
  return (
    <MainLayout>
      <>
        {children}

        {/* scroll to top section */}
        <ScrollFab />
      </>
    </MainLayout>
  );
}

Default.propTypes = { children: PropTypes.any };
