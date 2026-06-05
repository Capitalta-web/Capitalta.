// @project
import { Cta1 } from '@/blocks/cta';
import { PrivacyPolicy2 } from '@/blocks/privacy-policy';
import { SmallHero2 } from '@/blocks/small-hero';

// @data
import { smallHero6, cta } from './data';

/***************************  PAGE - PRIVACY POLICY  ***************************/

export default function PrivacyPolicy() {
  return (
    <>
      <SmallHero2 {...smallHero6} />
      <PrivacyPolicy2 />
      <Cta1 {...cta} />
    </>
  );
}
