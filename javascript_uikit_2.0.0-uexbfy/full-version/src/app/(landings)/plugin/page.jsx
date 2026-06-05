import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const Plugin = dynamic(() => import('@/views/landings/plugin'));

/***************************  METADATA - PLUGIN  ***************************/

export const metadata = { ...SEO_CONTENT.pluginLanding };

/***************************  PAGE - PLUGIN  ***************************/

export default function PluginPage() {
  return <Plugin />;
}
