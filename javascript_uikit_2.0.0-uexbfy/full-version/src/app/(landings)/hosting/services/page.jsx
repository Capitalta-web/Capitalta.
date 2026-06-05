import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const Services = dynamic(() => import('@/views/landings/hosting/services'));

/***************************  METADATA - SERVICES  ***************************/

export const metadata = { ...SEO_CONTENT.servicesPage };

/***************************  PAGE - SERVICES  ***************************/

export default function ServicesPage() {
  return <Services />;
}
