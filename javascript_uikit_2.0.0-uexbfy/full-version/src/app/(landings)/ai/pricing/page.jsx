import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const Price = dynamic(() => import('@/views/landings/ai/pricing'));

/***************************  METADATA - PRICING  ***************************/

export const metadata = { ...SEO_CONTENT.pricingPage };

/***************************  PAGE - PRICING  ***************************/

export default function PricingPage() {
  return <Price />;
}
