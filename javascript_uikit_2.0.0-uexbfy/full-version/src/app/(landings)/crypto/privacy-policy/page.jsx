import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const PrivacyPolicy = dynamic(() => import('@/views/landings/crypto/privacy-policy'));

/***************************  METADATA - PRIVACY POLICY  ***************************/

export const metadata = { ...SEO_CONTENT.privacyPolicy };

/*************************** PAGE - PRIVACY POLICY ***************************/

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
