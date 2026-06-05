// @project
import { Clientele6 } from '@/blocks/clientele';
import { DynamicComponentType } from '@/enum';

/***************************  CLIENTELE 6 - DATA  ***************************/

const data = {
  title: 'Trusted by 10,000+ companies around the world',
  clienteleList: [
    { image: { component: 'clientele/Techlify', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Marketly', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Financely', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Financely', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Techlify', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Marketly', type: DynamicComponentType.IMAGE } }
  ]
};

/***************************  BLOCK - CLIENTELE 6  ***************************/

export default function BlockClientele6() {
  return <Clientele6 {...data} />;
}
