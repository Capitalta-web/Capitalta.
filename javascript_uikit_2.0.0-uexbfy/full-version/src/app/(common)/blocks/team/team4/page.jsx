// @project
import { Team4 } from '@/blocks/team';

/***************************  TEAM 4 - DATA  ***************************/

const data = {
  heading: 'Meet our dynamic team',
  caption: 'Innovation and success are driven by a diverse team of dedicated professionals.',
  members: [
    {
      name: 'Tricia Yundt',
      role: 'Chief Executive Officer',
      avatar: '/assets/images/profile/profile-1.png'
    },
    {
      name: 'Henrietta Bayer',
      role: 'Chief Technology Officer',
      avatar: '/assets/images/profile/profile-2.png',
      badge: 'Best employee of the year'
    },
    {
      name: 'Elmer Heller',
      role: 'Chief Financial Officer',
      avatar: '/assets/images/profile/profile-3.png'
    },
    {
      name: 'Melissa Altenwerth',
      role: 'Chief Executive Officer',
      avatar: '/assets/images/profile/profile-4.png'
    },
    {
      name: 'Josefina Murray',
      role: 'Product Managers',
      avatar: '/assets/images/profile/profile-5.png'
    },
    {
      name: 'Dave Mayer',
      role: 'Marketing Managers',
      avatar: '/assets/images/profile/profile-6.png'
    },
    {
      name: 'Marlene Stehr',
      role: 'Customer Success Managers',
      avatar: '/assets/images/profile/profile-7.png'
    },
    {
      name: 'Benny Bailey',
      role: 'IT Manager',
      avatar: '/assets/images/profile/profile-8.png'
    }
  ]
};

/***************************  BLOCK - TEAM 4  ***************************/

export default function BlockTeam4() {
  return <Team4 {...data} />;
}
