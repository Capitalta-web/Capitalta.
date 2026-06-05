import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const Career = dynamic(() => import('@/views/landings/crm/career'));

/***************************  METADATA - CAREER  ***************************/

export const metadata = { ...SEO_CONTENT.careerPage };

/***************************  PAGE - CAREER  ***************************/

export default function CareerPage() {
  return <Career />;
}
