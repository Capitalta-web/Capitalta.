// @project
import { ContactUs2 } from '@/blocks/contact-us';

/***************************  CONTACT US 2 - DATA  ***************************/

const data = {
  heading: 'We’d love to hear from you',
  caption: 'Explore key statistics and trends shaping our understanding of the current landscape.',
  contactDetails: { address: '118 E John Carpenter Fwy, Irving, Texas', email: 'example@gmail.com', phone: '+1 58974635869' },
  bgImage: '/assets/images/graphics/ai/background1.svg'
};

/***************************  BLOCK - CONTACT US 2  ***************************/

export default function BlockContactUs2() {
  return <ContactUs2 {...data} />;
}
