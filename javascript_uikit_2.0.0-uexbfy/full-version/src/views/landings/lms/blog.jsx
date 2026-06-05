'use client';

// @project
import { SmallHero1 } from '@/blocks/small-hero';
import { Blog7 } from '@/blocks/blog';

// @data
import { blog7, blogSmallHero1 } from './data';

/***************************  PAGE - BLOG  ***************************/

export default function Blog() {
  return (
    <>
      <SmallHero1 {...blogSmallHero1} />
      <Blog7 {...blog7} />
    </>
  );
}
