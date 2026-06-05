import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const CoursesDetails = dynamic(() => import('@/views/landings/lms/courses-details'));

/***************************  METADATA - COURSES DETAILS  ***************************/

export const metadata = { ...SEO_CONTENT.courseDetailsPage };

/***************************  PAGE - COURSES DETAILS  ***************************/

export default function ContactPage() {
  return <CoursesDetails />;
}
