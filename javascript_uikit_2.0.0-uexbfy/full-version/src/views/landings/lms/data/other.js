import { LANDING_PATH } from '@/path';

export const other = {
  heading: 'Explore our Online Subjects',
  caption: 'Be a part of a winning culture that fosters collaboration, creativity, and success in every career path',
  other: [
    {
      title: 'Product Design',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: '70+ Students'
        },
        {
          icon: 'tabler-history',
          name: '2:00 - 4:00 PM'
        }
      ],
      btn: { children: 'More Details' }
    },
    {
      title: 'Front-End Developer',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: '100+ Students'
        },
        {
          icon: 'tabler-history',
          name: '3:00 - 5:00 PM'
        }
      ],
      btn: { children: 'More Details' }
    },
    {
      title: 'Back-End Developer',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: '50+ Students'
        },
        {
          icon: 'tabler-history',
          name: '4:00 - 6:10 PM'
        }
      ],
      btn: { children: 'More Details' }
    },
    {
      title: 'Scrum Master',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: '120+ Students'
        }
      ],
      btn: { children: 'More Details' }
    }
  ]
};

export const other3 = {
  heading: 'Explore learning opportunities',
  caption: 'Broaden your knowledge, sharpen your skills, and embrace the endless possibilities of learning.',
  exploreMore: { children: 'Explore all Courses' },
  items: [
    {
      title: 'Creative writing bootcamp',
      date: '10 Apr 2025',
      caption: 'By Tricia Wolf',
      image: '/assets/images/lms/course/course1.png',
      avatar: '/assets/images/profile/profile-1.png',
      views: '20',
      comments: '14k',
      amount: 199.99,
      rating: 4,
      href: `${LANDING_PATH.lms}/courses-details`
    },
    {
      title: 'Digital marketing mastery',
      date: '08 Apr 2025',
      caption: 'By Jennifer Talpa',
      image: '/assets/images/lms/course/course2.png',
      avatar: '/assets/images/profile/profile-2.png',
      views: '20',
      comments: '14k',
      amount: 149.99,
      rating: 4,
      href: `${LANDING_PATH.lms}/courses-details`
    },
    {
      title: 'UI/UX designer essentials',
      caption: 'By Tobias Burden',
      date: '06 Apr 2025',
      image: '/assets/images/lms/course/course3.png',
      avatar: '/assets/images/profile/profile-3.png',
      views: '20',
      comments: '14k',
      amount: 80.99,
      rating: 5,
      href: `${LANDING_PATH.lms}/courses-details`
    }
  ]
};

export const coursesOther3 = {
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
      image: '/assets/images/lms/course/course1.png',
      avatar: '/assets/images/profile/profile-1.png',
      views: '20',
      comments: '14k',
      amount: 199.99,
      rating: 4,
      href: 'courses-details'
    },
    {
      title: 'Digital marketing mastery',
      date: '08 Apr 2025',
      caption: 'By Jennifer Talpa',
      image: '/assets/images/lms/course/course2.png',
      categories: ['marketing', 'data_analytics', 'programming'],
      avatar: '/assets/images/profile/profile-2.png',
      views: '20',
      comments: '14k',
      amount: 149.99,
      rating: 4,
      href: 'courses-details'
    },
    {
      title: 'UI/UX designer essentials',
      caption: 'By Tobias Burden',
      date: '06 Apr 2025',
      image: '/assets/images/lms/course/course3.png',
      categories: ['ui_ux_design'],
      avatar: '/assets/images/profile/profile-3.png',
      views: '20',
      comments: '14k',
      amount: 80.99,
      rating: 5,
      href: 'courses-details'
    },
    {
      title: 'Video editing masterclass',
      date: '10 Apr 2025',
      caption: 'By Gaku Volumes',
      categories: ['product_design', 'data_analytics'],
      image: '/assets/images/lms/course/course4.png',
      avatar: '/assets/images/profile/profile-1.png',
      views: '20',
      comments: '14k',
      amount: 90.0,
      rating: 4,
      href: 'courses-details'
    },
    {
      title: 'SEO essentials',
      date: '08 Apr 2025',
      caption: 'By Aaron Reich',
      categories: ['marketing', 'data_analytics'],
      image: '/assets/images/lms/course/course5.png',
      avatar: '/assets/images/profile/profile-2.png',
      views: '20',
      comments: '14k',
      amount: 120.05,
      rating: 4,
      href: 'courses-details'
    },
    {
      title: 'Project management',
      date: '06 Apr 2025',
      caption: 'By Pavlo Kalenberg',
      categories: ['ui_ux_design'],
      image: '/assets/images/lms/course/course6.png',
      avatar: '/assets/images/profile/profile-3.png',
      views: '20',
      comments: '14k',
      amount: 149.99,
      rating: 5,
      href: 'courses-details'
    },
    {
      title: 'Data science',
      date: '10 Apr 2025',
      caption: 'By Roberta Thornton',
      categories: ['product_design', 'data_analytics'],
      image: '/assets/images/lms/course/course7.png',
      avatar: '/assets/images/profile/profile-1.png',
      views: '20',
      comments: '14k',
      amount: 80.99,
      rating: 4,
      href: 'courses-details'
    },
    {
      title: 'Graphic design',
      date: '08 Apr 2025',
      caption: 'By Davey Fonseca',
      categories: ['marketing', 'machine_learning'],
      image: '/assets/images/lms/course/course8.png',
      avatar: '/assets/images/profile/profile-2.png',
      views: '20',
      comments: '14k',
      amount: 199.99,
      rating: 4,
      href: 'courses-details'
    }
  ]
};
