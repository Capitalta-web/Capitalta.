// @project
import Other3 from '@/blocks/other/Other3';

/***************************  OTHER 3 - DATA  ***************************/

const data = {
  heading: 'Explore learning opportunities',
  caption: 'Broaden your knowledge, sharpen your skills, and embrace the endless possibilities of learning.',
  exploreMore: { children: 'Explore all Courses' },
  categories: [
    { label: 'All Courses', value: '' },
    { label: 'Programming', value: 'programming' },
    { label: 'Product Design', value: 'product_design' },
    { label: 'Data Analytics', value: 'data_analytics' },
    { label: 'UI/UX Design', value: 'ui_ux_design' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Machine Learning', value: 'machine_learning' }
  ],
  items: [
    {
      title: 'Creative writing bootcamp',
      date: '10 Apr 2025',
      caption: 'By Tricia Wolf',
      categories: ['product_design', 'data_analytics'],
      image: '/assets/images/other/other-8.png',
      avatar: '/assets/images/profile/profile-1.png',
      views: '20',
      comments: '14k',
      amount: 199.99,
      rating: 4
    },
    {
      title: 'Digital marketing mastery',
      date: '08 Apr 2025',
      caption: 'By Jennifer Talpa',
      categories: ['marketing', 'data_analytics'],
      image: '/assets/images/other/other-7.png',
      avatar: '/assets/images/profile/profile-2.png',
      views: '20',
      comments: '14k',
      amount: 149.99,
      rating: 4
    },
    {
      title: 'UI/UX designer essentials',
      caption: 'By Tobias Burden',
      date: '06 Apr 2025',
      categories: ['ui_ux_design'],
      image: '/assets/images/other/other-9.png',
      avatar: '/assets/images/profile/profile-3.png',
      views: '20',
      comments: '14k',
      amount: 80.99,
      rating: 5
    }
  ]
};

/***************************  BLOCK - OTHER 3  ***************************/

export default function BlockOther3() {
  return <Other3 {...data} />;
}
