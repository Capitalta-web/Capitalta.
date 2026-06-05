import { IconType } from '@/enum';

export const process = {
  heading: 'Effortless onboarding',
  caption: 'From job posting to candidate selection, our platform simplifies every step of the recruitment process.',
  image: { light: '/assets/images/graphics/hrm/desktop1-light.svg', dark: '/assets/images/graphics/hrm/desktop1-dark.svg' },
  defaultExpanded: 'panel1',
  cards: [
    {
      title: 'Onboarding and Setup',
      description: 'Import employee data or add employees manually.',
      icon: { name: 'tabler-settings-up', type: IconType.STROKE, stroke: 1 },
      list: [
        {
          primary: `Leverage the HRM's reporting and analytics tools to gain insights.`
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
      title: 'Usage and Implementation',
      description: 'Derive insights from data and implement strategic actions.',
      icon: { name: 'tabler-app-window', type: IconType.STROKE, stroke: 1 },
      list: [
        {
          primary: `Analyze customer data to identify key trends and opportunities.`
        },
        {
          primary: 'Generate detailed reports that highlight performance metrics and areas for improvement.'
        },
        {
          primary: 'Develop and implement strategies based on data-driven insights to drive growth.'
        }
      ]
    },
    {
      title: 'Analysis and Optimization',
      description: 'Identify areas for improvement and implement',

      icon: { name: 'tabler-chart-histogram', type: IconType.STROKE, stroke: 1 },
      moreLink: { children: 'more...', href: '#', sx: { textAlign: 'right' } },
      list: [
        {
          primary: `Create personalized experiences that resonate with your customers.`
        },
        {
          primary: 'Leverage customer feedback to continuously improve engagement strategies.'
        },
        {
          primary: 'Utilize HRM tools to manage customer interactions and track engagement levels.'
        },
        {
          primary: 'Implement loyalty programs and rewards to foster long-term relationships.'
        }
      ]
    }
  ]
};
