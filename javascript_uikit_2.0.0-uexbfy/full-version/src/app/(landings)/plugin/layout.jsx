import PropTypes from 'prop-types';
// @next
import dynamic from 'next/dynamic';

// @project
import LandingPresentation from '@/components/LandingPresentation';

const ScrollFab = dynamic(() => import('@/components/ScrollFab'));
const PluginLayout = dynamic(() => import('@/views/landings/plugin/layout'));

/***************************  LAYOUT - PLUGIN  ***************************/

export default function Plugin({ children }) {
  return (
    <PluginLayout>
      <>
        {children}

        {/* pre-built landings */}
        <LandingPresentation />

        {/* scroll to top section */}
        <ScrollFab />
      </>
    </PluginLayout>
  );
}

Plugin.propTypes = { children: PropTypes.any };
