// @project
import LogoSection from '@/components/logo';
import { DynamicComponentType } from '@/enum';

export const cta = {
  heading: 'Unlock your HR potential today!',
  icon: <LogoSection isIcon={true} sx={{ '& svg': { width: 14, margin: 'auto' } }} />,
  caption: 'Take the first step towards HR excellence. Sign up now for a demo. ',
  primaryBtn: { children: 'Get Started' },
  clienteleList: [
    { image: { component: 'clientele/Techlify', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Marketly', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Financely', type: DynamicComponentType.IMAGE } },
    { image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE } }
  ]
};
