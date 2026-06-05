// @project
import { Cta1 } from '@/blocks/cta';

/***************************  CALL TO ACTION 1 - DATA  ***************************/

const data = {
  bgImage: '/assets/images/graphics/ai/background1.svg',
  heading: 'Maximize efficiency and productivity with our comprehensive CRM solution',
  primaryBtn: { children: 'Get Started - It’s Free Now' }
};

/***************************  CALL TO ACTION - 1  ***************************/

export default function BlockCta1() {
  return <Cta1 {...data} />;
}
