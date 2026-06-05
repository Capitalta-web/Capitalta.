import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const PMS = dynamic(() => import('@/views/landings/pms'));

/***************************  METADATA - PMS  ***************************/

export const metadata = { ...SEO_CONTENT.pmsLanding };

/***************************  PAGE - PMS  ***************************/

export default function PMSPage() {
  return <PMS />;
}
