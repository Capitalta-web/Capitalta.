import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const Solution = dynamic(() => import('@/views/landings/ai/solution'));

/***************************  METADATA - SOLUTION  ***************************/

export const metadata = { ...SEO_CONTENT.solutionsPage };

/***************************  PAGE - SOLUTION  ***************************/

export default function SolutionsPage() {
  return <Solution />;
}
