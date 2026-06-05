// @project
import { Team3 } from '@/blocks/team';

/***************************  TEAM 3 - DATA  ***************************/

const data = {
  heading: 'Meet our dynamic team',
  caption: 'Innovation and success are driven by a diverse team of dedicated professionals.',
  members: [
    {
      name: 'Tricia Yundt',
      role: 'Chief Executive Officer',
      avatar: '/assets/images/profile/profile-1.png',
      socialLinks: { facebook: '#', instagram: '#', linkedin: '#' }
    },
    {
      name: 'Henrietta Bayer',
      role: 'Chief Technology Officer',
      avatar: '/assets/images/profile/profile-2.png',
      socialLinks: { facebook: '#', instagram: '#', linkedin: '#' }
    },
    {
      name: 'Elmer Heller',
      role: 'Chief Financial Officer',
      avatar: '/assets/images/profile/profile-3.png',
      socialLinks: { facebook: '#', instagram: '#', linkedin: '#' }
    },
    {
      name: 'Melissa Altenwerth',
      role: 'Chief Executive Officer',
      avatar: '/assets/images/profile/profile-4.png',
      socialLinks: { facebook: '#', instagram: '#', linkedin: '#' }
    },
    {
      name: 'Josefina Murray',
      role: 'Product Managers',
      avatar: '/assets/images/profile/profile-5.png',
      socialLinks: { facebook: '#', instagram: '#', linkedin: '#' }
    },
    {
      name: 'Dave Mayer',
      role: 'Marketing Managers',
      avatar: '/assets/images/profile/profile-6.png',
      socialLinks: { facebook: '#', instagram: '#', linkedin: '#' }
    },
    {
      name: 'Marlene Stehr',
      role: 'Customer Success Managers',
      avatar: '/assets/images/profile/profile-7.png',
      socialLinks: { facebook: '#', instagram: '#', linkedin: '#' }
    },
    {
      name: 'Benny Bailey',
      role: 'IT Manager',
      avatar: '/assets/images/profile/profile-8.png',
      socialLinks: { facebook: '#', instagram: '#', linkedin: '#' }
    }
  ]
};

/***************************  BLOCK - TEAM 3  ***************************/

export default function BlockTeam3() {
  return <Team3 {...data} />;
}
