// @project
import { Faq3 } from '@/blocks/faq';
import { ListBadgeColors } from '@/enum';

/***************************  FAQ 3 - DATA  ***************************/

const data = {
  heading: 'Frequently asked questions',
  caption: 'With advanced analytics and reporting, you can track customer behavior, sales trends, & many more to make',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: 'Can CRM be used for marketing purposes?',
      answer:
        'Yes, a CRM system can be a powerful tool for marketing. It helps track customer interactions, segment your audience, and automate marketing campaigns. By analyzing customer data, you can create personalized marketing strategies that improve engagement and conversion rates.'
    },
    {
      question: 'How does your CRM platform help with lead management?',
      answer: {
        content:
          'Our CRM platform helps you manage leads efficiently by providing tools to track and nurture them throughout the sales funnel.',
        type: 'list',
        data: [
          { primary: 'Use AI to score leads based on engagement and potential.' },
          { primary: 'Segment leads into categories for targeted communication.' },
          { primary: 'Automate follow-ups and reminders to ensure timely engagement.' }
        ],
        color: ListBadgeColors.WHITE
      }
    },
    {
      question: 'How does CRM benefit sales teams?',
      answer:
        'CRM systems offer significant benefits to sales teams by centralizing customer data, automating tasks, and providing insights into sales activities. This helps sales reps focus on building relationships and closing deals more efficiently.'
    },
    {
      question: 'Can I customize the CRM to suit my business needs?',
      answer: {
        content: 'Utilize AI to predict customer behavior, sales trends, and identify opportunities',
        type: 'list',
        data: [
          { primary: `Leverage the CRM's reporting and analytics tools to gain insights.` },
          { primary: 'Identify opportunities, analyze performance, and make data-driven decisions.' },
          { primary: 'Take action based on the data to enhance relationships, sales, and business success.' }
        ],
        color: ListBadgeColors.WHITE
      }
    },
    {
      question: 'What are the key components of a CRM system?',
      answer:
        'A CRM system typically includes several key components such as contact management, lead and opportunity tracking, sales automation, and analytics. These features work together to provide a comprehensive view of customer interactions and support business growth.'
    }
  ],
  getInTouch: {
    title: 'Still have a question?',
    description:
      'If you have further questions, feel free to reach out to us. We’re here to help you make the most of your CRM experience.',
    link: { children: 'Get in Touch', sx: { textTransform: 'none' } }
  },
  bgImage: '/assets/images/graphics/ai/background1.svg'
};

/***************************  FAQ - 3  ***************************/

export default function BlockFaq3() {
  return <Faq3 {...data} />;
}
