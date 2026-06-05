export const faq = {
  heading: 'Frequently asked questions',
  caption: 'With advanced analytics and reporting, you can track customer behavior, sales trends, & many more to make.',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: 'What is a CRM platform, and why do I need it?',
      answer: `A CRM platform is a software tool that helps businesses manage, track, and organize interactions with customers and potential customers. Think of it as a digital hub for sales, marketing, and customer service teams to stay on the same page and work more efficiently.`
    },
    {
      question: 'How does your CRM platform help with lead management?',
      answer: {
        content:
          'Great question! A CRM (Customer Relationship Management) platform helps with lead management by organizing, tracking, and nurturing your leads through every stage of the sales funnel. Here’s how it typically works',
        type: 'list',
        data: [
          {
            primary: `Automatically pulls leads from multiple sources—like websites, social media, email campaigns, or ads—into one centralized system.`
          },
          { primary: 'Assigns tags, scores, or categories to leads based on behavior, demographics, or engagement level' },
          { primary: 'Automates follow-ups with personalized email sequences, SMS, or task reminders.' }
        ]
      }
    },
    {
      question: 'What is a CRM platform, and why do I need it?',
      answer: `A CRM platform is a software tool that helps businesses manage and analyze customer interactions and data throughout the customer lifecycle, with the goal of improving business relationships, boosting customer retention, and driving sales growth.`
    },
    {
      question: `Can I customize the CRM to suit my business needs?`,
      answer: {
        content: 'Utilize AI to predict customer behavior, sales trends, and identify opportunities',
        type: 'list',
        data: [
          { primary: `Leverage the CRM's reporting and analytics tools to gain insights.` },
          { primary: 'Identify opportunities, analyze performance, and make data-driven decisions.' },
          { primary: 'Take action based on the data to enhance relationships, sales, and business success.' }
        ]
      }
    },
    {
      question: 'What kind of analytics and reporting does your CRM provide?',
      answer:
        'Great question! A solid CRM system typically offers a wide range of analytics and reporting tools to help businesses understand their customer data, sales performance, marketing effectiveness, and overall operations. Here’s a breakdown of what most CRMs (like Salesforce, HubSpot, Zoho CRM, etc.) '
    }
  ]
};

export const faq5 = {
  heading: 'Frequently asked questions',
  caption: 'Discover how our product seamlessly integrates with various tools.',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: `What pricing plans do you offer?`,
      answer: {
        type: 'list',
        data: [
          { primary: 'Flexible plans designed to fit your needs' },
          { primary: 'Choose the perfect plan for your business.' },
          { primary: 'Affordable pricing with no hidden fees.' },
          { primary: 'Find a plan that works for you—simple, transparent pricing.' },
          { primary: 'Get the best value with our flexible pricing options.' },
          { primary: 'Scalable plans to grow with your business.' }
        ]
      }
    },
    {
      question: `How does the free trial work?`,
      answer: `Enjoy full access to all premium features during your free trial. No credit card required—cancel anytime.`
    },
    {
      question: `Can I switch plans at any time?`,
      answer: `"Yes, you can upgrade or downgrade your plan anytime. Changes take effect immediately, ensuring flexibility for your needs."`
    },
    {
      question: 'Are there any setup fees?',
      answer: 'No, we do not charge any setup fees. The pricing you see is the total cost, and there are no hidden fees.'
    },

    {
      question: `What payment methods do you accept?`,
      answer: `We accept major credit cards, PayPal, and other secure payment methods. Additional options may be available based on your location.`
    },
    {
      question: `Is there a discount for annual subscriptions?`,
      answer: `Yes! Enjoy a discounted rate when you choose an annual subscription. Save more while getting full access to all features.`
    }
  ],
  getInTouch: {
    title: 'Still have a question?',
    description: 'Contact us directly if you have any doubt we are happy to help you!',
    link: { children: 'Get in Touch' }
  },
  image: { light: '/assets/images/crm/graphics/graphics3-light.svg', dark: '/assets/images/crm/graphics/graphics3-dark.svg' }
};

export const faq6 = {
  defaultExpanded: 'Fees & Charges',
  faqList: [
    {
      question: 'What is CRM?',
      answer: `CRM stands for Customer Relationship Management. It's a strategy, set of practices, and often software tools used by businesses to manage their interactions with current and potential customers.`,
      category: 'Getting Started'
    },
    {
      question: `How does CRM automate scaling?`,
      answer: `Great question! CRM (Customer Relationship Management) systems help businesses automate scaling primarily by making customer interactions, sales processes, and marketing efforts more efficient, repeatable, and data-driven. `,
      category: 'Getting Started'
    },
    {
      question: `What sets CloudHarmony apart in terms of cost management?`,
      answer: {
        content: `Utilize AI to predict customer behavior, sales trends, and identify opportunities`,
        type: 'list',
        data: [
          { primary: `Leverage the CRM's reporting and analytics tools to gain insights.` },
          { primary: 'Identify opportunities, analyze performance, and make data-driven decisions.' },
          { primary: 'Take action based on the data to enhance relationships, sales, and business success.' }
        ]
      },
      category: 'Getting Started'
    },
    {
      question: `What sets CRM apart in terms of cost management?`,
      answer: ` Customer Relationship Management (CRM) systems are often associated with sales and customer service, but they also bring real value in cost management.`,
      category: 'Getting Started'
    },
    {
      question: `What is the difference between the Figma and codebase versions?`,
      answer:
        'The Figma version is for design and prototyping, while the codebase version provides ready-to-use React components for development.',
      category: 'Security & Safety'
    },
    {
      question: 'How can I download the template after purchase?',
      answer: 'You will receive the template in a .zip format immediately after successfully purchasing the template.',
      category: 'Security & Safety'
    },
    {
      question: `What's included in the CRM license?`,
      answer: {
        content: 'It includes the Figma UI kit, React Material UI codebase, regular updates, and customer support.',
        type: 'list',
        data: [
          { primary: `One License = One End Product` },
          { primary: `Separate License for Each Product` },
          { primary: `Comply with License Terms` }
        ]
      },
      category: 'Fees & Charges'
    },
    {
      question: `Can I use CRM for multiple projects?`,
      answer: {
        content:
          'No, one license allows usage in a single end product. For each new product or project, you are required to purchase a separate license. This ensures compliance with the licensing terms and provides ongoing support for each individual product. Make sure to obtain the appropriate license for every new project you work on.',
        type: 'list',
        data: [
          { primary: `One License = One End Product` },
          { primary: `Separate License for Each Product` },
          { primary: `Comply with License Terms` }
        ]
      },
      category: 'Fees & Charges'
    },

    {
      question: 'Do you offer refunds?',
      answer:
        'Yes, we offer refunds, but only if you provide a valid reason to support your claim. For more details, please review our MUI Store Refund Policy.',
      category: 'Fees & Charges'
    },
    {
      question: 'Do I get access to future updates?',
      answer: {
        content:
          'Yes, you will receive future updates for 1 year from the date of purchase. If you need updates after 1 year, you will need to purchase the license again. However, this is not a renewal—your license is valid for a lifetime, but updates are limited to the 1-year period.',
        type: 'list',
        data: [{ primary: `1 Year Free Updates` }, { primary: `License validity is lifetime` }]
      },
      category: 'Technical Support & Assistance'
    },
    {
      question: 'Is support included with the template purchase?',
      answer: {
        content:
          'Support is included for 6 months, but it is limited to resolving issues within the template itself. We do not provide support for installation, customization queries, or troubleshooting unrelated issues. For ongoing support beyond 6 months, you will need to extend the support period with an additional purchase.',
        type: 'list',
        data: [{ primary: `6 Months Support` }, { primary: `No Installation Support` }, { primary: `No Customization Support` }]
      },
      category: 'Technical Support & Assistance'
    }
  ],
  categories: ['Getting Started', 'Security & Safety', 'Fees & Charges', 'Technical Support & Assistance', 'Regulation & Compliance'],
  activeCategory: 'Getting Started'
};
