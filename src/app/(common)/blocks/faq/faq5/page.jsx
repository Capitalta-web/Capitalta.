// @project
import branding from '@/branding.json';
import { Faq5 } from '@/blocks/faq';

/***************************  FAQ 5 - DATA  ***************************/

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
          { primary: 'Provides insights through AI-driven analytics to help predict growth patterns.' }
        ]
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
          { primary: 'Identify opportunities, analyze performance, and make data-driven decisions.' }
        ]
      }
    },
    {
      question: `How does ${branding.brandName} ensure data security?`,
      answer: `${branding.brandName} prioritizes data security by implementing industry-leading practices, including end-to-end encryption, regular security audits, and compliance with global data protection regulations. This ensures that your data is safeguarded against unauthorized access and breaches.`
    },
    {
      question: `How does ${branding.brandName} ensure real-time performance?`,
      answer: `${branding.brandName} utilizes advanced cloud infrastructure and optimized algorithms to deliver real-time data processing and performance. The platform continuously monitors system health and dynamically allocates resources to ensure that applications run smoothly even during peak demand. This ensures minimal latency, fast response times, and a seamless user experience across all operations.`
    }
  ],
  getInTouch: {
    title: 'Still have a question?',
    description: 'Contact us directly if you have any doubt we are happy to help you!',
    link: { children: 'Get in Touch', sx: { textTransform: 'none' } }
  },
  image: { light: '/assets/images/graphics/ai/graphics3-light.svg', dark: '/assets/images/graphics/ai/graphics3-dark.svg' }
};

/***************************  FAQ - 5  ***************************/

export default function BlockFaq5() {
  return <Faq5 {...data} />;
}
