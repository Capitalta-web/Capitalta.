import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const Courses = dynamic(() => import('@/views/landings/lms/courses'));

/***************************  METADATA - BLOG  ***************************/

export const metadata = { ...SEO_CONTENT.coursesPage };

/***************************  PAGE - COURSES  ***************************/

export default function CoursesPage() {
  return <Courses />;
}
