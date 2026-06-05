import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const Collaborate = dynamic(() => import('@/views/landings/ai/collaborate'));

/***************************  METADATA - COLLABORATE  ***************************/

export const metadata = { ...SEO_CONTENT.collaboratePage };

/***************************  PAGE - COLLABORATE  ***************************/

export default function CollaboratePage() {
  return <Collaborate />;
}
