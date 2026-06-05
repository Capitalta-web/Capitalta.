// @project
import { ContactUs3 } from '@/blocks/contact-us';

/***************************  CONTACT US 3 - DATA  ***************************/

const data = {
  heading: 'Let’s talk',
  caption: 'Need support or have a question about coast? We’re here to help.',
  list: [
    {
      icon: 'tabler-mail',
      title: 'Get help',
      content: 'Speak to team and ask anything about cost',
      link: { children: 'Get Info' }
    },
    {
      icon: 'tabler-credit-card',
      title: 'Try coast',
      content: 'See how coast can help your business by getting early access.',
      link: { children: 'Get started' }
    },
    {
      icon: 'tabler-phone',
      title: 'Contact sale',
      content: 'Speak to someone from our sales team.',
      link: { children: 'Contact Sales' }
    },
    {
      icon: 'tabler-help-circle',
      title: 'Have a question',
      content: 'See our frequently asked question',
      link: { children: 'Get Answers' }
    },
    {
      icon: 'tabler-folder-check',
      title: 'Press & media',
      content: 'Get in touch with our PR team',
      link: { children: 'Press Contact' }
    }
  ]
};

/***************************  BLOCK - CONTACT US 3  ***************************/

export default function BlockContactUs3() {
  return <ContactUs3 {...data} />;
}
