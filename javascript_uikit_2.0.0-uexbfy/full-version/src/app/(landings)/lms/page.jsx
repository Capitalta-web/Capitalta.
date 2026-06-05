import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const LMS = dynamic(() => import('@/views/landings/lms'));

/***************************  METADATA - LMS  ***************************/

export const metadata = { ...SEO_CONTENT.lmsLanding };

/***************************  PAGE - LMS  ***************************/

export default function LMSPage() {
  return <LMS />;
}
