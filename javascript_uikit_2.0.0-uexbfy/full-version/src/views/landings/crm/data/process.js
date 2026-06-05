export const process = {
  heading: 'Made to fit your workflow',
  caption: 'With advanced analytics and reporting, you can track customer behavior, sales trends.',
  image: { light: '/assets/images/crm/desktop1-light.svg', dark: '/assets/images/crm/desktop1-dark.svg' },
  defaultExpanded: 'panel1',
  cards: [
    {
      title: 'CRM for your business growth',
      description: 'Leverage the capabilities of CRM to drive your business towards growth and success.',
      icon: 'custom-folder',
      list: [
        {
          primary: `Leverage the CRM's reporting and analytics tools to gain insights.`
        },
        {
          primary: 'Identify opportunities, analyze performance, and make data-driven decisions.'
        },
        {
          primary: 'Take action based on the data to enhance relationships, sales, and business success.'
        }
      ]
    },
    {
      title: 'CRM for sales representatives',
      description: 'Experience the transformative power of CRM',
      icon: 'custom-arrow',
      list: [
        {
          primary: `Empowering sales representatives to excel and achieve unparalleled success.`
        },
        {
          primary: 'Maximize sales potential with CRM tailored for sales representatives.'
        },
        {
          primary: 'Unleash the power of CRM to empower sales representatives.'
        }
      ]
    },
    {
      title: 'Revolutionizing sales operations',
      description: 'Transform your sales operations with the dynamic capabilities of CRM.',
      icon: 'custom-wrap-card',
      moreLink: { children: 'more...', href: '#', sx: { textAlign: 'right' } },
      list: [
        {
          primary: `A compelling outline for a report or article`
        },
        {
          primary: 'A punchy slide deck summary for a presentation'
        },
        {
          primary: 'A vision statement for internal or external messaging'
        },
        {
          primary: 'Or even help define strategic initiatives to actually revolutionize sales ops'
        }
      ]
    }
  ]
};
