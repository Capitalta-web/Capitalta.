import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const CRM = dynamic(() => import('@/views/landings/crm'));

/***************************  METADATA - CRM  ***************************/

export const metadata = { ...SEO_CONTENT.crmLanding };

/***************************  PAGE - CRM  ***************************/

export default function CRMPage() {
  return <CRM />;
}
