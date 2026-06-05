// @project
import { ContactUs5 } from '@/blocks/contact-us';

/***************************  CONTACT US 5 - DATA  ***************************/

const data = {
  heading: 'Drop us a line',
  caption: "We're here to answer your questions and address your concerns",
  contactDetails: { address: '118 E John Carpenter Fwy, Irving, Texas', email: 'example@gmail.com', phone: '+1 58974635869' }
};

/***************************  BLOCK - CONTACT US 5  ***************************/

export default function BlockContactUs5() {
  return <ContactUs5 {...data} />;
}
