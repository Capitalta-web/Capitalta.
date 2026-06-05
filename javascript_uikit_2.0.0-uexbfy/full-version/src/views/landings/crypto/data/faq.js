// @project
import branding from '@/branding.json';
import { ListBadgeColors } from '@/enum';

export const faq = {
  heading: 'Frequently asked questions',
  caption: 'With advanced analytics and reporting, you can track customer behavior, sales trends, & many more to make',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: 'How do I create an account on crypto wallet app?',
      answer:
        'Yes, a Crypto system can be a powerful tool for marketing. It helps track customer interactions, segment your audience, and automate marketing campaigns. By analyzing customer data, you can create personalized marketing strategies that improve engagement and conversion rates.'
    },
    {
      question: ' What cryptocurrencies are supported by the wallet app?',
      answer: {
        content:
          'Our Crypto platform helps you manage leads efficiently by providing tools to track and nurture them throughout the sales funnel.',
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
      question: 'Is the wallet app compatible with multiple devices?',
      answer:
        'Crypto systems offer significant benefits to sales teams by centralizing customer data, automating tasks, and providing insights into sales activities. This helps sales reps focus on building relationships and closing deals more efficiently.'
    },
    {
      question: 'How can I secure my crypto assets in the wallet?',
      answer: {
        content: 'Utilize AI to predict customer behavior, sales trends, and identify opportunities',
        type: 'list',
        data: [
          { primary: `Leverage the Crypto's reporting and analytics tools to gain insights.` },
          { primary: 'Identify opportunities, analyze performance, and make data-driven decisions.' },
          { primary: 'Take action based on the data to enhance relationships, sales, and business success.' }
        ],
        color: ListBadgeColors.WHITE
      }
    },
    {
      question: 'Can I transfer funds between different wallets using this app?',
      answer:
        'A Crypto system typically includes several key components such as contact management, lead and opportunity tracking, sales automation, and analytics. These features work together to provide a comprehensive view of customer interactions and support business growth.'
    }
  ],
  getInTouch: {
    title: 'Still have a question?',
    description: "Can't find what you're looking for? Contact us, and we'll be happy to help!",
    link: { children: 'Get in Touch', href: branding.company.socialLink.support, target: '_blank', rel: 'noopener noreferrer' }
  }
};

export const faq1 = {
  heading: 'Looking for answers? Find them fast here',
  caption: 'Transforming complex blockchain technology into user-friendly solutions.',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: 'How does the live trading feature work?',
      answer:
        'Our live trading feature allows users to execute real-time trades based on market conditions. It uses advanced algorithms to analyze market trends and execute buy/sell orders instantly. Users can also set stop-loss and take-profit limits to manage risk effectively.'
    },
    {
      question: 'What can I expect from live discussions?',
      answer:
        'Live discussions provide real-time market insights, expert analysis, and trading strategies. Our community of traders and analysts share updates, predictions, and news to help you make informed trading decisions.'
    },
    {
      question: 'How accurate are your signals and margin calls?',
      answer:
        'Our trading signals and margin calls are generated using AI-driven analytics and expert market assessments. While accuracy rates are high, cryptocurrency markets are highly volatile, and we recommend users conduct their own research and use risk management strategies.'
    },
    {
      question: 'What kind of research and information is provided?',
      answer:
        'We offer comprehensive market research, daily updates, and in-depth reports on crypto trends, allowing you to stay well-informed about market movements. Reports are accessible anytime through our app.'
    },
    {
      question: 'Is the platform suitable for beginners in crypto?',
      answer:
        'Yes! Our platform is designed for both beginners and experienced traders. We offer educational resources, step-by-step guides, and a user-friendly interface to help new users navigate the world of cryptocurrency trading with confidence.'
    }
  ]
};
