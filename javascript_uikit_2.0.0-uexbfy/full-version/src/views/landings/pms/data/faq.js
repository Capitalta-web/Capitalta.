// @project
import branding from '@/branding.json';
import { ListBadgeColors } from '@/enum';

export const faq = {
  heading: 'Frequently asked questions',
  caption: 'Discover how our product seamlessly integrates with various tools and platforms, ensuring compatibility for diverse workflows.',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: `How do I sign up for the software?`,
      answer: `${branding.brandName} is a cloud-based platform designed to streamline business operations by automating workflows, improving collaboration, and offering scalable solutions tailored to your specific needs. It integrates seamlessly with existing tools and provides real-time analytics to help you make data-driven decisions.`
    },
    {
      question: `Is there a free trial available?`,
      answer: {
        content: `${branding.brandName} uses advanced automation tools to facilitate scaling your operations effortlessly.`,
        type: 'list',
        data: [
          { primary: 'Automatically adjusts resources based on demand to ensure optimal performance.' },
          { primary: 'Provides insights through AI-driven analytics to help predict growth patterns.' },
          { primary: 'Enables easy configuration of workflows to accommodate increasing workloads without manual intervention.' }
        ],
        color: ListBadgeColors.PRIMARY
      }
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'Yes, our software is fully responsive and can be accessed on any device with an internet connection, including smartphones and tablets.'
    },
    {
      question: 'Is the software compatible with mobile devices?',
      answer:
        'Yes, our software is fully responsive and can be accessed on any device with an internet connection, including smartphones and tablets.'
    },
    {
      question: 'How often is the software updated?',
      answer: `${branding.brandName} prioritizes data security by implementing industry-leading practices, including end-to-end encryption, regular security audits, and compliance with global data protection regulations. This ensures that your data is safeguarded against unauthorized access and breaches.`
    }
  ],
  getInTouch: {
    title: 'Still have a question?',
    description: 'Contact us directly if you have any doubt we are happy to help you!',
    link: { children: 'Get in Touch', href: branding.company.socialLink.support, target: '_blank', rel: 'noopener noreferrer' }
  }
};
