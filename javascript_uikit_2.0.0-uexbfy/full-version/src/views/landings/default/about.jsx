'use client';

// @project
import { Feature15 } from '@/blocks/feature';
import { Cta5 } from '@/blocks/cta';
import SectionHero from '@/components/SectionHero';

// @data
import { aboutCapitalta, cta5 } from './data';

/***************************  PAGE - ABOUT  ***************************/

export default function About() {
  return (
    <>
      <SectionHero heading="Más que una financiera, un aliado estratégico" search={false} />
      <Feature15 {...aboutCapitalta} />
      <Cta5 {...cta5} />
    </>
  );
}
