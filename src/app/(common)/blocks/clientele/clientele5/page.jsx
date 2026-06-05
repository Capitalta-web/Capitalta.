// @project
import { Clientele5 } from '@/blocks/clientele';
import { DynamicComponentType } from '@/enum';

/***************************  CLIENTELE 5 - DATA  ***************************/

const data = {
  title: 'Trusted by 10,000+ companies around the world',
  description: " In partnership with renowned banks, we're committed to offering you a secure and advanced financial experience",
  clienteleList: [
    { image: { component: 'clientele/Techlify', type: DynamicComponentType.IMAGE, props: { imageSize: { width: 99.07, height: 27.92 } } } },
    { image: { component: 'clientele/Marketly', type: DynamicComponentType.IMAGE, props: { imageSize: { width: 96.3, height: 19 } } } },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE, props: { imageSize: { width: 84.31, height: 19.39 } } } },
    {
      image: { component: 'clientele/Financely', type: DynamicComponentType.IMAGE, props: { imageSize: { width: 111.49, height: 19.65 } } }
    },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE, props: { imageSize: { width: 84.31, height: 19.39 } } } },
    {
      image: { component: 'clientele/Financely', type: DynamicComponentType.IMAGE, props: { imageSize: { width: 111.49, height: 19.65 } } }
    },
    { image: { component: 'clientele/Techlify', type: DynamicComponentType.IMAGE, props: { imageSize: { width: 99.07, height: 27.92 } } } },
    { image: { component: 'clientele/Marketly', type: DynamicComponentType.IMAGE, props: { imageSize: { width: 96.3, height: 19 } } } }
  ]
};

/***************************  BLOCK - CLIENTELE 5  ***************************/

export default function BlockClientele5() {
  return <Clientele5 {...data} />;
}
