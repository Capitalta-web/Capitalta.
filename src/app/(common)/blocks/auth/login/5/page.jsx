// @project
import { Login5 } from '@/blocks/auth/login';

/***************************  LOGIN 5 - DATA  ***************************/

const data = {
  heading: 'Sign In',
  caption: 'Start your 30-day free trial',
  testimonials: [
    {
      review: "It's become my go-to tool for quick and precise information processing. Highly recommended!",
      ratings: 4,
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'Sydnie La', role: 'Direct Optimization Executive' }
    },
    {
      review: `Navigate to the platform's official website or open the mobile app.`,
      ratings: 3,
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Thara Ban', role: 'Direct Optimization Executive' }
    },
    {
      review: `Complete any additional verification steps like entering a code sent to your phone or email.`,
      ratings: 5,
      profile: { avatar: '/assets/images/user/avatar3.png', name: 'Jhon Doi', role: 'Direct Optimization Executive' }
    }
  ]
};

/***************************  BLOCK - LOGIN 5  ***************************/

export default function BlockLogin5() {
  return <Login5 {...data} />;
}
