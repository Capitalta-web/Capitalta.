'use client';

// @project
import { SmallHero3 } from '@/blocks/small-hero';
import { PrivacyPolicy1 } from '@/blocks/privacy-policy';

// @data
import { privacySmallHero3 } from './data';

/***************************  PAGE - PRIVACY POLICY  ***************************/

export default function PrivacyPolicy() {
  return (
    <>
      <SmallHero3 {...privacySmallHero3} />
      <PrivacyPolicy1 />
    </>
  );
}
