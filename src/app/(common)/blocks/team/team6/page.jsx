// @project
import { Team6 } from '@/blocks/team';

/***************************  TEAM 6 - DATA  ***************************/

const data = {
  heading: 'Quality is at the heart of everything we do',
  caption: "At Linear, quality defines us. Precision, passion, perfection - it's in every detail we create.",
  image: '/assets/images/team/team-member-2.jpg',
  description: 'Our Dedicated Team',
  actionBtn: { children: 'See Open Position' },
  members: [
    {
      name: 'Ms. Myrtle Luettgen',
      role: 'Founder and CEO',
      avatar: '/assets/images/team/profile-1.png'
    },
    {
      name: 'Henrietta Bayer',
      role: 'Chief Technology Officer',
      avatar: '/assets/images/team/profile-2.png'
    },
    {
      name: 'Elmer Heller',
      role: 'Chief Financial Officer',
      avatar: '/assets/images/team/profile-3.png'
    },
    {
      name: 'Melissa Altenwerth',
      role: 'Chief Executive Officer',
      avatar: '/assets/images/team/profile-4.png'
    },
    {
      name: 'Josefina Murray',
      role: 'Founder and CEO',
      avatar: '/assets/images/team/profile-5.png'
    },
    {
      name: 'Dave Mayer',
      role: 'Marketing Managers',
      avatar: '/assets/images/team/profile-6.png'
    },
    {
      name: 'Marlene Stehr',
      role: 'Customer Success Managers',
      avatar: '/assets/images/team/profile-7.png'
    },
    {
      name: 'Benny Bailey',
      role: 'IT Manager',
      avatar: '/assets/images/team/profile-8.png'
    }
  ]
};

/***************************  BLOCK - TEAM 6  ***************************/

export default function BlockTeam6() {
  return <Team6 {...data} />;
}
