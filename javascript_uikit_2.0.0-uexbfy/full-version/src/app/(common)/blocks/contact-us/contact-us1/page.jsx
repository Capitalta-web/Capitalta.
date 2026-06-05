// @project
import { ContactUs1 } from '@/blocks/contact-us';

/***************************  CONTACT US 1 - DATA  ***************************/

const data = {
  heading: 'We’d love to hear from you',
  caption: 'Explore key statistics and trends shaping our understanding of the current landscape.',
  contactDetails: { address: '118 E John Carpenter Fwy, Irving, Texas', email: 'contact@gmail.com', phone: '+1 58974635869' }
};

/***************************  BLOCK - CONTACT US 1  ***************************/

export default function BlockContactUs1() {
  return <ContactUs1 {...data} />;
}
