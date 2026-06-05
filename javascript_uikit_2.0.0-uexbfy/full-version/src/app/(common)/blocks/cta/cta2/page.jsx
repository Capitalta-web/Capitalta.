// @project
import { Cta2 } from '@/blocks/cta';

/***************************  CALL TO ACTION 2 - DATA  ***************************/

const data = {
  bgImage: '/assets/images/graphics/ai/background1.svg',
  heading: 'Maximize efficiency and productivity with our comprehensive CRM solution',
  primaryBtn: { children: 'Get Started - It’s Free' }
};

/***************************  CALL TO ACTION - 2  ***************************/

export default function BlockCta2() {
  return <Cta2 {...data} />;
}
