import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const Hosting = dynamic(() => import('@/views/landings/hosting'));

/***************************  METADATA - HOSTING  ***************************/

export const metadata = { ...SEO_CONTENT.hostingLanding };

/***************************  PAGE - HOSTING  ***************************/

export default function HostingPage() {
  return <Hosting />;
}
