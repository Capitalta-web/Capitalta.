// @project
import { Clientele8 } from '@/blocks/clientele';
import { DynamicComponentType } from '@/enum';

/***************************  CLIENTELE 8 - DATA  ***************************/

const data = {
  heading: '10,000+ companies already growing',
  caption: 'In partnership with renowned banks, we’re committed to offering you a secure and advanced financial experience',
  clienteleList: [
    { image: { component: 'clientele/Techlify', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Marketly', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Financely', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE } }
  ]
};

/***************************  BLOCK - CLIENTELE 8  ***************************/

export default function BlockClientele8() {
  return <Clientele8 {...data} />;
}
