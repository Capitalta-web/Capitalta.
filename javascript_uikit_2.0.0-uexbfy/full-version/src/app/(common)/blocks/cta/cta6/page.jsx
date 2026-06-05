// @project
import { Cta6 } from '@/blocks/cta';
import { DynamicComponentType } from '@/enum';

/***************************  CALL TO ACTION 6 - DATA  ***************************/

const data = {
  heading: 'Trusted by 80000+ businesses',
  caption: 'Collaborate confidently with granular access controls and regulatory compliance. ',
  primaryBtn: { children: 'Get Started' },
  clienteleList: [
    { image: { component: 'clientele/Techlify', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Marketly', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Financely', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE } }
  ]
};

/***************************  BLOCK - CALL TO ACTION 6  ***************************/

export default function BlockCta6() {
  return <Cta6 {...data} />;
}
