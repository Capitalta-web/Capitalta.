import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const About = dynamic(() => import('@/views/landings/default/about'));

/***************************  METADATA - ABOUT  ***************************/

export const metadata = { ...SEO_CONTENT.aboutPage };

/***************************  PAGE - ABOUT  ***************************/

export default function AboutPage() {
  return <About />;
}
