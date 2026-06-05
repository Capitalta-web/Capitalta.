import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const AI = dynamic(() => import('@/views/landings/ai'));

/***************************  METADATA - AI  ***************************/

export const metadata = { ...SEO_CONTENT.aiLanding };

/***************************  PAGE - AI  ***************************/

export default function AIPage() {
  return <AI />;
}
