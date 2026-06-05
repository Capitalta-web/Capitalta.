import { IconType } from '@/enum';

export const feature5 = {
  heading: 'Data-driven decision making',
  caption: 'Your workforce with features designed to empower and connect employees.',
  image1: { light: '/assets/images/graphics/hrm/graphics3-light.svg', dark: '/assets/images/graphics/hrm/graphics3-dark.svg' },
  image2: { dark: '/assets/images/graphics/hrm/graphics2-dark.svg', light: '/assets/images/graphics/hrm/graphics2-light.svg' },
  features: [
    {
      animationDelay: 0.2,
      icon: 'tabler-settings-up',
      title: 'Efficiency',
      content: 'Streamline HR processes, automate repetitive tasks, and save time.'
    },
    {
      animationDelay: 0.4,
      icon: 'tabler-chart-histogram',
      title: 'Accuracy',
      content: 'Ensure data accuracy and minimize errors with centralized data management.'
    }
  ],
  features2: [
    {
      animationDelay: 0.2,
      icon: 'tabler-clipboard-text',
      title: 'Compliance',
      content: 'Stay compliant with labor laws and regulations through automated compliance.'
    },
    {
      animationDelay: 0.4,
      icon: 'tabler-coin',
      title: 'Cost savings',
      content: 'Reduce administrative costs and increase operational efficiency.'
    }
  ],
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' },
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: '10k+ Reviews (4.5 out of 5)'
  },
  content: 'Promote employee development and career growth through training and performance management features.',
  actionBtn: { children: 'Explore all Features', sx: { textTransform: 'none' } }
};

export const feature13 = {
  heading: 'HR analytics and reporting',
  caption: 'Access real-time insights into your workforce with customizable reports and analytics.',
  image: { light: '/assets/images/graphics/hrm/graphics1-light.svg', dark: '/assets/images/graphics/hrm/graphics1-dark.svg' },
  actionBtn: { children: 'Explore all Features', startIcon: false, sx: { textTransform: 'none' } },
  cards: [
    {
      icon: 'tabler-chart-histogram',
      title: 'Performance management',
      description: 'Streamline performance evaluations, goal-setting, and feedback processes.'
    },
    {
      icon: { name: 'custom-path', type: IconType.CUSTOM, color: 'primary.main' },
      title: 'Recruitment and Applicant tracking',
      description: 'Manage the entire recruitment lifecycle from job posting to candidate selection.'
    },
    {
      icon: 'tabler-history',
      title: 'Time and Attendance tracking',
      description: 'Easily track employee work hours, attendance, and overtime at many more things.'
    },
    {
      icon: 'tabler-clipboard-text',
      title: 'HR analytics and reporting',
      description: 'Access real-time insights into your workforce with customizable reports and analytics.'
    }
  ]
};
