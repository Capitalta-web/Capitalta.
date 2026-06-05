// @project
import { Cta14 } from '@/blocks/cta';

/***************************  CALL TO ACTION 14 - DATA  ***************************/

const data = {
  image: '/assets/images/graphics/ai/feature/5.png',
  avatar: '/assets/images/user/avatar2.png',
  name: 'Jennifer Talpa',
  ratings: 4,
  heading: 'Transform your data experience now!',
  caption: 'Outstanding customer support! They`re responsive and go above and beyond to ensure a smooth experience.',
  price: 149.99,
  primaryBtn: { children: '30 Days free trial', sx: { textTransform: 'none' } }
};

/***************************  CALL TO ACTION - 14  ***************************/

export default function BlockCta14() {
  return <Cta14 {...data} />;
}
