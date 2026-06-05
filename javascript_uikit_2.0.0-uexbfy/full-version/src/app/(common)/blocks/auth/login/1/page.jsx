// @project
import { Login1 } from '@/blocks/auth/login';

/***************************  LOGIN 1 - DATA  ***************************/

const data = {
  heading: 'Sign In',
  caption: 'Start your 30-day free trial',
  testimonials: [
    {
      review: 'Very easy to use. I am completely blown away. this is the real deal!',
      ratings: 4,
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'Sydnie', role: 'Direct Optimization Executive' }
    },
    {
      review: 'Very easy to use. I am completely blown away. this is the real deal!',
      ratings: 3,
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Thara Ban', role: 'Direct Optimization Executive' }
    },
    {
      review: 'Very easy to use. I am completely blown away. this is the real deal!',
      ratings: 5,
      profile: { avatar: '/assets/images/user/avatar3.png', name: 'Jhon Doie', role: 'Direct Optimization Executive' }
    }
  ],
  image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' }
};

/***************************  BLOCK - LOGIN 1  ***************************/

export default function BlockLogin1() {
  return <Login1 {...data} />;
}
