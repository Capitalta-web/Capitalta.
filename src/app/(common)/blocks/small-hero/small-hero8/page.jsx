// @project
import { SmallHero8 } from '@/blocks/small-hero';

/***************************  SMALL HERO 8 - DATA  ***************************/

const data = {
  heading: 'Simplify success with AI excellence',
  caption: 'Empowering teams with efficient tools to enhance customer relationships and drive results.',
  video: {
    thumbnail: '/assets/images/other/thumbnail.svg',
    src: '/assets/videos/test.mp4'
  }
};

/***************************  BLOCK - SMALL HERO 8  ***************************/

export default function BlockSmallHero8() {
  return <SmallHero8 {...data} />;
}
