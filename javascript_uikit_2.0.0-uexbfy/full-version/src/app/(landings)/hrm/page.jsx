import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const HRM = dynamic(() => import('@/views/landings/hrm'));

/***************************  METADATA - HRM  ***************************/

export const metadata = { ...SEO_CONTENT.hrmLanding };

/***************************  PAGE - HRM  ***************************/

export default function HRMPage() {
  return <HRM />;
}
