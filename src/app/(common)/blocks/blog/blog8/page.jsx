// @project
import { Blog8 } from '@/blocks/blog';

/***************************  BLOG 8 - DATA  ***************************/

const data = {
  heading: 'Resources for strategic growth',
  caption: 'Discover the features that will transform your customer relationships.',
  exploreMore: { children: 'Explore All Blog' },
  categories: [
    { label: 'Marketing', value: 'marketing' },
    { label: 'Business', value: 'business' },
    { label: 'Technologies', value: 'technologies' },
    { label: 'News & Events', value: 'news_&_events' },
    { label: 'Product Update', value: 'product_update' },
    { label: 'Social Selling', value: 'social_selling' },
    { label: 'Services', value: 'services' }
  ],
  blogs: [
    {
      title: 'The power of SaaS pages',
      date: '10 Apr 2025',
      caption: 'By Tricia Wolf',
      categories: ['business', 'technologies'],
      image: '/assets/images/blog/blog7.png',
      avatar: '/assets/images/profile/profile-1.png',
      views: '25k',
      comments: '5k'
    },
    {
      title: 'Behind the wheel: Stories',
      date: '08 Apr 2025',
      caption: 'By Jennifer Talpa',
      categories: ['product_update', 'marketing'],
      image: '/assets/images/graphics/ai/background1.svg',
      avatar: '/assets/images/profile/profile-2.png',
      views: '12k',
      comments: '3k'
    },
    {
      title: 'The green road ahead',
      caption: 'By Tobias Burden',
      date: '06 Apr 2025',
      categories: ['news_&_events', 'services'],
      image: '/assets/images/blog/blog8.png',
      avatar: '/assets/images/profile/profile-3.png',
      views: '43k',
      comments: '2k'
    }
  ]
};

/***************************  BLOCK - BLOG 8  ***************************/

export default function BlockBlog8() {
  return <Blog8 {...data} />;
}
