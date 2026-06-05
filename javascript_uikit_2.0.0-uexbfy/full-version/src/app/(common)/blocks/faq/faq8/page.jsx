// @project
import branding from '@/branding.json';
import { Faq8 } from '@/blocks/faq';

/***************************  FAQ 8 - DATA  ***************************/

const data = {
  heading: 'Frequently asked questions',
  caption: 'Discover how our product seamlessly integrates with various tools.',
  defaultExpanded: 'panel0',
  faqList: [
    {
      question: `What is ${branding.brandName}?`,
      answer: `${branding.brandName} is a cutting-edge CRM platform powered by AI, designed to help startups and businesses streamline customer relationship management, enhance data analysis, and improve overall efficiency.`
    },
    {
      question: `Is ${branding.brandName} suitable for small businesses?`,
      answer: `Yes, ${branding.brandName} is designed to be scalable and flexible, making it suitable for businesses of all sizes, including small businesses. Its user-friendly interface and customizable features allow small businesses to manage their customer relationships effectively without needing extensive resources.`
    },
    {
      question: `How can I integrate ${branding.brandName} with my existing tools?`,
      answer: `${branding.brandName} supports integration with a wide range of third-party tools and platforms. You can connect ${branding.brandName} to your existing systems using our integration options and APIs. For detailed instructions and support, please refer to our integration guide or contact our support team.`
    },
    {
      question: `How does ${branding.brandName}’s AI enhance CRM capabilities?`,
      answer: `${branding.brandName}’s AI integrates seamlessly with CRM functions to provide advanced data analysis, personalized recommendations, and automation of routine tasks. This allows businesses to gain deeper insights into customer behavior, optimize interactions, and improve overall efficiency.`
    },
    {
      question: `Can I customize the features in ${branding.brandName}?`,
      answer: `Absolutely! ${branding.brandName} offers a high level of customization to fit your business needs. You can tailor features, workflows, and dashboards to match your specific requirements and preferences.`
    },
    {
      question: `Is my data secure with ${branding.brandName}?`,
      answer: `Yes, ${branding.brandName} takes data security very seriously. We employ industry-standard encryption, secure servers, and regular security audits to ensure that your data is protected. For more information on our security measures, please refer to our privacy policy.`
    }
  ],
  getInTouch: { link: { children: 'Get in Touch', sx: { textTransform: 'none' } } }
};

/***************************  FAQ - 8  ***************************/

export default function BlockFaq8() {
  return <Faq8 {...data} />;
}
