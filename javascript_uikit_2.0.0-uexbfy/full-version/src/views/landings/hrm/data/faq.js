// @project
import branding from '@/branding.json';
import { ListBadgeColors } from '@/enum';

export const faq = {
  heading: 'Frequently asked questions',
  caption: 'Find answers to common queries about our HRM platform below.',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: 'How do I sign up for the HRM platform?',
      answer:
        'Yes, a HRM system can be a powerful tool for marketing. It helps track customer interactions, segment your audience, and automate marketing campaigns. By analyzing customer data, you can create personalized marketing strategies that improve engagement and conversion rates.'
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes! Many SaaS products offer free trials to help you explore their features. For instance, allowing you to experience their full potential before committing to a subscription. These trials are a great way to test whether the platform fits your needs without any upfront cost.'
    },
    {
      question: 'Can I customize the platform to fit my company`s needs?',
      answer: {
        content:
          'Absolutely! Most modern HRM platforms are designed to be customizable, allowing you to tailor them to your company`s unique needs. This often includes:',
        type: 'list',
        data: [
          { primary: `Custom Workflows` },
          { primary: 'Flexible Reporting.' },
          { primary: 'Branded Interface' },
          { primary: 'Custom Fields' },
          { primary: 'Integration Options' }
        ],
        color: ListBadgeColors.WHITE
      }
    },
    {
      question: 'How secure is the HRM platform?',
      answer: {
        content: 'Our platform employs robust security measures to protect your data, including encryption and regular security audits.',
        type: 'list',
        data: [
          { primary: `Our platform takes security seriously.` },
          { primary: 'We employ robust security measures to protect your data.' },
          { primary: 'These measures include encryption and regular security audits.' }
        ],
        color: ListBadgeColors.WHITE
      }
    },
    {
      question: 'What kind of support do you offer?',
      answer:
        'A HRM system typically includes several key components such as contact management, lead and opportunity tracking, sales automation, and analytics. These features work together to provide a comprehensive view of customer interactions and support business growth.'
    }
  ],
  getInTouch: {
    title: 'Still have a question?',
    description: "Feel free to reach out to us if you have any additional questions or need further assistance. We're here to help!",
    link: {
      children: 'Get in Touch',
      href: branding.company.socialLink.support,
      target: '_blank',
      rel: 'noopener noreferrer',
      sx: { textTransform: 'none' }
    }
  }
};
