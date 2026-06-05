// @project
import { DynamicComponentType } from '@/enum';
import { LANDING_PATH } from '@/path';

export const blog = {
  heading: 'What you looking for?',
  caption: `Discover what piques your interest and find exactly what you're seeking!`,
  blogs: [
    {
      image: { component: 'blog/Teacher', type: DynamicComponentType.IMAGE },
      caption: 'Do you want to teach here?',
      link: { href: '#' },
      title:
        'Imagine being part of our dynamic educational team-shaping minds and inspiring future leaders. Are you ready to make a difference with your expertise and passion?'
    },
    {
      image: { component: 'blog/Student', type: DynamicComponentType.IMAGE },
      caption: 'Do you want to learn here?',
      link: { href: '#' },
      title:
        'Imagine diving into a world of knowledge and growth, where your curiosity is met with endless opportunities. Are you ready to embark on a transformative learning journey with us?'
    }
  ]
};

const blogImagePath = '/assets/images/lms/blog';

export const blog5 = {
  heading: 'Lots of new blogs & news',
  caption: 'The positive impact of our LMS on client experiences.',
  viewMore: { children: 'View All' },
  blogs: [
    {
      image: `${blogImagePath}/blog-9.png`,
      imagePosition: { backgroundSize: '200%', backgroundPosition: 'right bottom' },
      caption: '5 Ways to use padlet in higher-ed online classroom',
      link: { href: '/lms/blog-details' },
      date: '24 Jan 2024 · 5 Min Read'
    },
    {
      image: `${blogImagePath}/blog-10.png`,
      imagePosition: { backgroundSize: '200%', backgroundPosition: 'right top' },
      caption: '4 New zoom features enhance virtual teaching',
      link: { href: '/lms/blog-details' },
      date: '10 Feb 2024 · 3 Min Read'
    },
    {
      image: '/assets/images/lms/background1.svg',
      imagePosition: { backgroundSize: '150%', backgroundPosition: 'left top' },
      caption: 'Using social media to support online teaching',
      link: { href: '/lms/blog-details' },
      date: '25 Feb 2024 · 10 Min Read'
    }
  ]
};

export const blog3 = {
  heading: 'Resource center',
  caption: 'Discover the features that will transform your customer relationships.',
  blogs: [
    {
      image: '/assets/images/lms/blog/blog-9.png',
      imagePosition: { backgroundSize: '200%', backgroundPosition: 'right bottom' },
      caption: 'Crafting a customer-centric content strategy.',
      link: { href: '#' },
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Emily Davis', role: 'Content Strategy Lead' }
    },
    {
      image: '/assets/images/lms/blog/blog-10.png',
      imagePosition: { backgroundSize: '150%', backgroundPosition: 'right bottom' },
      caption: 'Optimizing sales processes with data-driven insights.',
      link: { href: '#' },
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'James Wilson', role: 'Sales Operations Manager' }
    }
  ]
};

export const blog7 = {
  blogs: [
    {
      image: '/assets/images/lms/blog/blog-1.png',
      title: 'How to choose the right course for your skillset',
      caption: 'Enhance teamwork with real-time sharing, updates, and communication features.',
      link: { children: 'Read More', href: `${LANDING_PATH.lms}/blog-details` }
    },
    {
      image: '/assets/images/lms/blog/blog-2.png',
      title: 'The future of online learning: Trends to watch',
      caption: 'Tales of journeys, encounters, and life-changing moments on the road.',
      link: { children: 'Read More', href: `${LANDING_PATH.lms}/blog-details` }
    },
    {
      image: '/assets/images/lms/blog/blog-3.png',
      title: 'Accessibility in LMS: making learning inclusive for all',
      caption: 'Paving the way to a sustainable and eco-friendly future.',
      link: { children: 'Read More', href: `${LANDING_PATH.lms}/blog-details` }
    },
    {
      image: '/assets/images/lms/blog/blog-4.png',
      title: 'Is Your LMS Aligned with Your Learning Goals?',
      caption: 'Qui sint consectetur consequatur repudiandae. Quae enim autem',
      link: { children: 'Read More', href: `${LANDING_PATH.lms}/blog-details` }
    },
    {
      image: '/assets/images/lms/blog/blog-5.png',
      title: 'How to Choose the Right LMS for Your Organization',
      caption: 'Vel dolor doloribus commodi dicta suscipit blanditiis.',
      link: { children: 'Read More', href: `${LANDING_PATH.lms}/blog-details` }
    },
    {
      image: '/assets/images/lms/blog/blog-6.png',
      title: 'AI-Powered LMS Platforms: The Future of Learning?',
      caption: 'Qui sint consectetur consequatur repudiandae. Quae enim autem',
      link: { children: 'Read More', href: `${LANDING_PATH.lms}/blog-details` }
    },
    {
      image: '/assets/images/lms/blog/blog-7.png',
      title: 'Top 10 LMS Features You Can’t Afford to Ignore',
      caption: 'Qui sint consectetur consequatur repudiandae. Quae enim autem',
      link: { children: 'Read More', href: `${LANDING_PATH.lms}/blog-details` }
    },
    {
      image: '/assets/images/lms/blog/blog-8.png',
      title: 'Why Every Organization Needs an LMS in 2025',
      caption: 'Vel dolor doloribus commodi dicta suscipit blanditiis.',
      link: { children: 'Read More', href: `${LANDING_PATH.lms}/blog-details` }
    }
  ]
};

export const blog9 = {
  heading: 'Recent blog & articles',
  caption: 'Fresh ideas, insightful stories, and the latest updates—all in one place.',
  exploreMore: { children: 'Explore All Blog' },
  blogs: [
    {
      title: 'The green road ahead',
      image: '/assets/images/lms/blog/blog-8.png',
      caption: 'Paving the way to a sustainable and eco-friendly future.',
      date: '24 Jan 2024',
      link: { children: 'Read More', href: '#' }
    },
    {
      title: 'Maximize efficiency',
      image: '/assets/images/lms/blog/blog-4.png',
      caption: 'Unlock peak performance with strategic optimization ',
      date: '24 Jan 2024',
      link: { children: 'Read More', href: '#' }
    }
  ]
};
