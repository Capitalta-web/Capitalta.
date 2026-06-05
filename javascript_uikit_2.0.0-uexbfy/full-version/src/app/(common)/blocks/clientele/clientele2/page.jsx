// @project
import { Clientele2 } from '@/blocks/clientele';
import { DynamicComponentType } from '@/enum';

/***************************  CLIENTELE 2 - DATA  ***************************/

const data = {
  title: '4,000+ companies already growing',
  clienteleList: [
    { image: { component: 'clientele/Techlify', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Marketly', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Financely', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE } }
  ]
};

/***************************  BLOCK - CLIENTELE 2  ***************************/

export default function BlockClientele2() {
  return <Clientele2 {...data} />;
}
