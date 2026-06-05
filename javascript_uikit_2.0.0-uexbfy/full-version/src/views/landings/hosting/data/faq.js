// @project
import branding from '@/branding.json';

export const faq = {
  heading: 'Frequently asked questions',
  caption: 'Discover how our product seamlessly integrates with various tools.',
  defaultExpanded: 'Fees & Charges',
  faqList: [
    {
      question: `Is ${branding.brandName} only for SaaS web apps?`,
      answer: `While ${branding.brandName} is designed with SaaS applications in mind, it’s not limited to SaaS products. ${branding.brandName} is multipurpose and can be used for a variety of websites and applications, whether it’s for an agency, digital product, CRM, blog, AI platform, or any other system. ${branding.brandName} is versatile and adaptable to fit any use case, SaaS or not. It’s built for all types of projects!`,
      category: 'General'
    },
    {
      question: `What makes ${branding.brandName} different from other UI Kits?`,
      answer: `${branding.brandName} offers industry-specific templates, a React Material UI Kit, Figma UI Kit, and flexible customization options that cater to both front-end marketing and admin interfaces.`,
      category: 'General'
    },
    {
      question: `Is ${branding.brandName} suitable for both developers and designers?`,
      answer: {
        content: `Yes, ${branding.brandName} is built for both, with a Figma UI kit for designers and React code for developers.`,
        type: 'list',
        data: [
          { primary: 'Figma UI Kit for Designers.' },
          { primary: 'React Material UI Code for Developers.' },
          { primary: 'Seamless Collaboration.' }
        ]
      },
      category: 'General'
    },
    {
      question: `What is the difference between the Figma and codebase versions?`,
      answer:
        'The Figma version is for design and prototyping, while the codebase version provides ready-to-use React components for development.',
      category: 'General'
    },
    {
      question: 'How can I download the template after purchase?',
      answer: 'You will receive the template in a .zip format immediately after successfully purchasing the template.',
      category: 'General'
    },
    {
      question: `What's included in the ${branding.brandName} license?`,
      answer: {
        content: 'It includes the Figma UI kit, React Material UI codebase, regular updates, and customer support.',
        type: 'list',
        data: [
          { primary: `One License = One End Product` },
          { primary: `Separate License for Each Product` },
          { primary: `Comply with License Terms` }
        ]
      },
      category: 'Support & Updates'
    },
    {
      question: `Can I use ${branding.brandName} for multiple projects?`,
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
      category: 'Support & Updates'
    },

    {
      question: 'Do you offer refunds?',
      answer:
        'Yes, we offer refunds, but only if you provide a valid reason to support your claim. For more details, please review our MUI Store Refund Policy.',
      category: 'Pricing'
    },
    {
      question: 'Do I get access to future updates?',
      answer: {
        content:
          'Yes, you will receive future updates for 1 year from the date of purchase. If you need updates after 1 year, you will need to purchase the license again. However, this is not a renewal—your license is valid for a lifetime, but updates are limited to the 1-year period.',
        type: 'list',
        data: [{ primary: `1 Year Free Updates` }, { primary: `License validity is lifetime` }]
      },
      category: 'Support & Updates'
    },
    {
      question: 'Is support included with the template purchase?',
      answer: {
        content:
          'Support is included for 6 months, but it is limited to resolving issues within the template itself. We do not provide support for installation, customization queries, or troubleshooting unrelated issues. For ongoing support beyond 6 months, you will need to extend the support period with an additional purchase.',
        type: 'list',
        data: [{ primary: `6 Months Support` }, { primary: `No Installation Support` }, { primary: `No Customization Support` }]
      },
      category: 'Support & Updates'
    }
  ],
  getInTouch: {
    link: { children: 'Get in Touch', href: branding.company.socialLink.support, target: '_blank', rel: 'noopener noreferrer' }
  },
  categories: ['General', 'Support & Updates'],
  activeCategory: 'General'
};

export const faq1 = {
  heading: 'Frequently asked questions',
  caption: 'Find answers to frequently asked questions about WordPress hosting india.',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: 'What is the use of hosting?',
      answer: `Hosting refers to the service that allows individuals or organizations to make their website or web application accessible on the internet. When you create a website, all its files, images, videos, and code need to be stored somewhere that's always connected to the web — that's what hosting does.  `
    },
    {
      question: 'What are the types of web hosting?',
      answer:
        'Web hosting refers to the service that allows individuals and organizations to make their website accessible on the internet. There are several types of web hosting, each suited for different needs based on website size, traffic, and technical requirements.'
    },
    {
      question: 'How do I choose the right hosting plan?',
      answer: `Choosing the right hosting plan depends on several factors related to your website's needs, expected traffic, and technical expertise. `
    },
    {
      question: 'What is an SSL certificate, and do I need one?',
      answer: {
        content: `An SSL certificate encrypts data between your website and its visitors, ensuring security. It's essential for websites handling sensitive information.`,

        type: 'list',
        data: [
          { primary: `It protects user data by encrypting information.` },
          { primary: 'Websites with SSL have a padlock icon and use "https://" in their URLs, which reassures users.' },
          { primary: 'Search engines like Google prioritize secure websites, improving your search rankings.' }
        ]
      }
    },
    {
      question: 'Can I host multiple websites on a single hosting plan?',
      answer: `you can host multiple websites on a single hosting plan, and this is a common practice for both individual users and businesses. `
    }
  ]
};

export const pricingFaq1 = {
  heading: 'Web hosting FAQs',
  caption: 'Get answers to common queries about our website hosting services.',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: 'How does web hosting work?',
      answer: `Web hosting is a service that allows you to store your website's files—HTML, images, CSS, videos, etc.—on a server (a powerful computer). This server is connected to the internet 24/7, so people can access your site anytime.`
    },
    {
      question: 'What is managed Hosting for WordPress?',
      answer:
        'Managed hosting for WordPress is a type of web hosting service where the hosting provider takes care of the technical aspects of running a WordPress site, allowing you to focus on creating content and growing your business. It’s a premium hosting solution that offers enhanced performance, security, and support specifically optimized for WordPress websites.'
    },
    {
      question: 'What Are the CPU, RAM, Inode and Disk Limits of Hosting for WordPress Plans?',
      answer:
        'The CPU, RAM, inode, and disk limits for WordPress hosting plans can vary depending on the hosting provider and the type of plan (shared hosting, VPS, dedicated, etc.). Here is a general breakdown of what you might expect in terms of limits across different hosting plans'
    },
    {
      question: 'Do I need hosting for WordPress?',
      answer: {
        content: `It’s simple – buy a Managed WordPress Hosting plan from Hostinger. Our plans include Web Application Firewall, Secure Access Manager, WordPress Malware Scanner, and more to secure your websites.`,
        type: 'list',
        data: [
          { primary: `Leverage the CRM's reporting and analytics tools to gain insights.` },
          { primary: 'Identify opportunities, analyze performance, and make data-driven decisions.' },
          { primary: 'Take action based on the data to enhance relationships, sales, and business success.' }
        ]
      }
    },
    {
      question: 'How Can I Create a WordPress Website?',
      answer: `Creating a WordPress website is a great choice! It's a popular, user-friendly platform that allows you to easily build and manage websites. Here's a step-by-step guide to creating a WordPress website `
    }
  ]
};
