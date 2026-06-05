// @project
import { Cta5 } from '@/blocks/cta';
import { Faq6 } from '@/blocks/faq';

// @data
import { cta5, faq } from './data';

/***************************  PAGE - FAQ  ***************************/

export default function Faq() {
  return (
    <>
      <Faq6 {...faq} />
      <Cta5 {...cta5} />
    </>
  );
}
