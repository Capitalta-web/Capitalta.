import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const Solutions = dynamic(() => import('@/views/landings/hosting/solutions'));

/***************************  METADATA - SOLUTIONS  ***************************/

export const metadata = { ...SEO_CONTENT.solutionsPage };

/***************************  PAGE - SOLUTIONS  ***************************/

export default function SolutionsPage() {
  return <Solutions />;
}
