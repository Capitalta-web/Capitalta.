// @project
import { Faq1 } from '@/blocks/faq';
import { ListBadgeColors } from '@/enum';

/***************************  FAQ 1 - DATA  ***************************/

const data = {
  heading: 'Frequently asked questions',
  caption: 'With advanced analytics and reporting, you can track customer behavior, sales trends, & many more to make',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: 'What is a CRM platform, and why do I need it?',
      answer:
        'A CRM (Customer Relationship Management) platform is a tool that helps businesses manage interactions with current and potential customers. It centralizes customer information, automates communication, and facilitates better decision-making by providing insights into customer behavior. A CRM is essential for improving customer retention, streamlining sales processes, and enhancing overall customer satisfaction.'
    },
    {
      question: 'Can I customize the CRM to suit my business needs?',
      answer:
        'Absolutely! Our CRM platform is highly customizable to fit your unique business requirements. You can tailor dashboards, fields, and modules to match your specific sales processes, customer segmentation, and reporting needs. This flexibility ensures that the CRM grows with your business, providing the tools you need to maintain customer relationships and drive growth.'
    },
    {
      question: 'What kind of analytics and reporting does your CRM provide?',
      answer:
        'Our CRM offers a comprehensive suite of analytics and reporting tools that provide insights into customer behavior, sales performance, and marketing effectiveness. You can generate customizable reports on key metrics like conversion rates, customer lifetime value, and sales pipeline health. These insights help you make data-driven decisions to improve customer satisfaction and business outcomes.'
    },
    {
      question: 'How does your CRM platform help with lead management?',
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
      question: 'How secure is the data stored in your CRM?',
      answer:
        'Data security is a top priority for us. Our CRM platform employs advanced encryption, secure access controls, and regular security audits to protect your data. We adhere to industry-standard compliance regulations, ensuring that your customer information is safe from unauthorized access and breaches.'
    }
  ]
};

/***************************  FAQ - 1  ***************************/

export default function BlockFaq1() {
  return <Faq1 {...data} />;
}
