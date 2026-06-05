import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const Crypto = dynamic(() => import('@/views/landings/crypto'));

/***************************  METADATA - CRYPTO  ***************************/

export const metadata = { ...SEO_CONTENT.cryptoLanding };

/***************************  PAGE - CRYPTO  ***************************/

export default function CryptoPage() {
  return <Crypto />;
}
