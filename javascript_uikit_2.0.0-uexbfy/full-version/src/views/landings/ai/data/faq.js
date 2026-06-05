// @project
import branding from '@/branding.json';
import { ListBadgeColors } from '@/enum';

export const faq = {
  heading: 'Frequently asked questions',
  caption: 'With advanced analytics and reporting, you can track customer behavior, sales trends, & many more to make',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: 'What are developer AI tools?',
      answer: `Developer AI tools are software solutions that utilize machine learning and artificial intelligence to assist in various stages of the development process. They can generate code, debug, and provide intelligent recommendations to improve productivity and code quality.`
    },
    {
      question: 'How do developer AI tools work?',
      answer: {
        content:
          'Developer AI tools offer several benefits, including improved productivity, faster development cycles, better code quality, reduced manual effort, and enhanced collaboration.',
        type: 'list',
        data: [
          { primary: `They help automate repetitive coding tasks, allowing developers to focus on solving complex problems.` },
          {
            primary: 'Provide real-time guidance and suggestions to help developers avoid common mistakes and improve their skills.'
          },
          { primary: 'Enable teams to leverage data insights for better decision-making and business outcomes.' }
        ],
        color: ListBadgeColors.WHITE
      }
    },
    {
      question: 'How does AI benefit sales teams?',
      answer: `AI tools help sales teams by providing predictive analytics, personalized recommendations, and automated outreach strategies. This helps teams focus on high-priority leads and optimize customer interactions, resulting in better sales performance.`
    },
    {
      question: 'What are the benefits of using developer AI tools?',
      answer: {
        content: 'The benefits of using developer AI tools include increased productivity, faster development ',
        type: 'list',
        data: [
          { primary: `Cycles, improved code quality, reduced manual effort, enhanced collaboration` },
          {
            primary:
              'It acts as a virtual guide, offering insights, tips, and solutions to common challenges faced during the development journey.'
          },
          { primary: 'Take action based on the data to enhance relationships, sales, and business success.' }
        ],
        color: ListBadgeColors.WHITE
      }
    },
    {
      question: 'Can developer AI tools replace human developers?',
      answer: `While AI tools can assist in the development process and improve efficiency, they cannot replace human developers. These tools enhance human capabilities by automating repetitive tasks and providing smart suggestions, but creativity, critical thinking, and complex problem-solving still require human expertise.`
    }
  ],
  getInTouch: {
    title: 'Still have a question?',
    description: `If you have any further questions or need assistance, our team is ready to help.`,
    link: {
      children: 'Get in touch',
      href: branding.company.socialLink.support,
      target: '_blank',
      rel: 'noopener noreferrer',
      sx: { textTransform: 'none' }
    }
  },
  bgImage: '/assets/images/ai/background1.svg'
};

export const faq1 = {
  heading: 'Frequently ask questions',
  caption: 'With advanced analytics and reporting, you can track customer behavior, sales trends, & many more to make',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: 'What is SaasAI?',
      answer:
        'SaasAI is an AI-powered platform designed to help businesses automate workflows, analyze data, and improve decision-making through intelligent automation and integrations.'
    },
    {
      question: 'Who is SaasAI for?',
      answer:
        'SaasAI is designed for businesses of all sizes, including startups, enterprises, and professionals looking to enhance productivity, streamline operations, and leverage AI-driven insights.'
    },
    {
      question: 'How do I customize  SaasAI to my needs?',
      answer:
        'SaasAI offers flexible customization options, allowing you to integrate with your existing tools, adjust workflows, and configure AI models to align with your specific business requirements.'
    },
    {
      question: `How does SaasAI protect my privacy and data?`,
      answer:
        'All your data is encrypted and only used by our AI (when you want to share it) to improve responses. We never access or share your personal info with third parties without consent.'
    },
    {
      question: `What countries/languages does SaasAI work for?`,
      answer:
        'SaasAI supports multiple languages and is available in various countries. Our AI continuously improves language processing capabilities to provide accurate responses tailored to different regions.'
    }
  ]
};
