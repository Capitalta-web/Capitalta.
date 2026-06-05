// @project
import branding from '@/branding.json';
import { Faq7 } from '@/blocks/faq';
import { ListBadgeColors } from '@/enum';

/***************************  FAQ 7 - DATA  ***************************/

const data = {
  heading: 'Frequently asked questions',
  caption: 'Discover how our product seamlessly integrates with various tools.',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: `What is ${branding.brandName}?`,
      answer: `${branding.brandName} is a cloud-based platform designed to streamline business operations by automating workflows, improving collaboration, and offering scalable solutions tailored to your specific needs. It integrates seamlessly with existing tools and provides real-time analytics to help you make data-driven decisions.`
    },
    {
      question: `How does ${branding.brandName} automate scaling?`,
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
      question: `Can ${branding.brandName} be used with multiple cloud?`,
      answer: `Yes, ${branding.brandName} is designed with multi-cloud support in mind. It allows you to deploy and manage applications across various cloud platforms such as AWS, Google Cloud, and Azure. This flexibility ensures that you can choose the best provider for each aspect of your business, optimizing costs and performance.`
    },
    {
      question: 'What sets CloudHarmony apart in terms of cost management?',
      answer: {
        content: 'Utilize AI to predict customer behavior, sales trends, and identify opportunities',
        type: 'list',
        data: [
          { primary: `Leverage the CRM's reporting and analytics tools to gain insights.` },
          { primary: 'Identify opportunities, analyze performance, and make data-driven decisions.' },
          { primary: 'Take action based on the data to enhance relationships, sales, and business success.' }
        ],
        color: ListBadgeColors.PRIMARY
      }
    },
    {
      question: `How does ${branding.brandName} ensure data security?`,
      answer: `${branding.brandName} prioritizes data security by implementing industry-leading practices, including end-to-end encryption, regular security audits, and compliance with global data protection regulations. This ensures that your data is safeguarded against unauthorized access and breaches.`
    }
  ],
  getInTouch: { link: { children: 'Get in Touch', sx: { textTransform: 'none' } } },
  topics: ['Getting Started', 'Security & Safety', 'Fees & Charges', 'Technical Support & Assistance', 'Regulation & Compliance'],
  activeTopicData: 'Getting Started'
};

/***************************  FAQ - 7  ***************************/

export default function BlockFaq7() {
  return <Faq7 {...data} />;
}
