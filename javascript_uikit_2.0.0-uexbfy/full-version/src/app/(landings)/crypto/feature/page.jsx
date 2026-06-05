import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const Feature = dynamic(() => import('@/views/landings/crypto/feature'));

/***************************  METADATA - FEATURE  ***************************/

export const metadata = { ...SEO_CONTENT.featurePage };

/***************************  PAGE - FEATURE  ***************************/

export default function FeaturePage() {
  return <Feature />;
}
