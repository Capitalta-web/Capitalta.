// @project
import { Login4 } from '@/blocks/auth/login';

/***************************  LOGIN 4 - DATA  ***************************/

const data = {
  heading: 'You are one step away Sign In',
  reviewData: {
    avatarList: [
      '/assets/images/user/avatar1.png',
      '/assets/images/user/avatar2.png',
      '/assets/images/user/avatar3.png',
      '/assets/images/user/avatar4.png',
      '/assets/images/user/avatar5.png'
    ],
    rating: 4.5,
    totalReviews: '200+'
  },
  blockDetail: [
    { counter: '90', defaultUnit: '%', caption: 'Power of AI for navigation and communication' },
    { counter: '150', defaultUnit: '+', caption: 'Showcasing the global impact and adoption' }
  ]
};

/***************************  BLOCK - LOGIN 4  ***************************/

export default function BlockLogin4() {
  return <Login4 {...data} />;
}
