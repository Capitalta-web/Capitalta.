// @project
import { Cta3 } from '@/blocks/cta';

/***************************  CALL TO ACTION - 3  ***************************/

export default function BlockCta3() {
  const tagList = [
    {
      label: 'AI-Powered Predictive',
      icon: 'custom-interface'
    },
    {
      label: 'Customization',
      icon: 'custom-arrow'
    },
    {
      label: 'Abstract',
      icon: 'custom-card'
    },
    {
      label: 'Safe Secure',
      icon: 'custom-lock'
    },
    {
      label: 'Paypal',
      icon: 'custom-paypal'
    },
    {
      label: 'Analysis',
      icon: 'custom-statastic'
    },
    {
      label: 'Gamification',
      icon: 'custom-remote'
    }
  ];

  const marquee1 = [...tagList];
  const marquee2 = [...tagList].reverse();
  const marquee3 = [...tagList].sort((a, b) => a.label.localeCompare(b.label));

  const data = {
    bgImage1: '/assets/images/graphics/ai/background1.svg',
    bgImage2: '/assets/images/graphics/ai/background1.svg',
    heading: 'Maximize efficiency and productivity with our comprehensive CRM solution',
    primaryBtn: { children: 'Get Started - It’s Free Now' },
    marquees: [
      { id: 'marquee1', marqueeProps: { speed: 20, direction: 'right' }, data: marquee1 },
      { id: 'marquee2', marqueeProps: { speed: 30, direction: 'left' }, data: marquee2 },
      { id: 'marquee3', marqueeProps: { speed: 35, direction: 'right' }, data: marquee3 }
    ]
  };

  return <Cta3 {...data} />;
}
