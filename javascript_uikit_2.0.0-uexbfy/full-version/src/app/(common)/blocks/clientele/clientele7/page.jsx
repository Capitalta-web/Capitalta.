// @project
import { Clientele7 } from '@/blocks/clientele';
import { DynamicComponentType } from '@/enum';

/***************************  CLIENTELE 7 - DATA  ***************************/

const data = {
  title: 'Trusted by 10,000+ companies around the world',
  exploreBtn: { children: 'View all client', sx: { textTransform: 'none' } },
  clienteleList: [
    { image: { component: 'clientele/Techlify', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Marketly', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Financely', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Techlify', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Marketly', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Financely', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Techlify', type: DynamicComponentType.IMAGE } }
  ]
};

/***************************  BLOCK - CLIENTELE 7  ***************************/

export default function BlockClientele7() {
  return <Clientele7 {...data} />;
}
