// @project
import { ContactUs6 } from '@/blocks/contact-us';

/***************************  CONTACT US 6 - DATA  ***************************/

const data = {
  heading: 'Get in touch',
  caption: "We'd love to hear from you! Contact us for any inquiries, feedback, or assistance.",
  contactDetails: {
    address: '118 E John Carpenter Fwy, Irving, Texas',
    email: 'example@gmail.com',
    phone: '+1 58974635869',
    time: '10:00 AM to 8:00 PM'
  }
};

/***************************  BLOCK - CONTACT US 6  ***************************/

export default function BlockContactUs6() {
  return <ContactUs6 {...data} />;
}
