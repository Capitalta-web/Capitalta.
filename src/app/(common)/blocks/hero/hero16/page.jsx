// @project
import { Hero16 } from '@/blocks/hero';

/***************************  HERO 16 - DATA  ***************************/

const data = {
  heading: 'Seize the Future of Business ✦ Technology',
  caption: 'Our SaaS platform delivers a flawless user experience and unmatched results.',
  secondaryBtn: { children: 'Explore Pro Advantage' },
  poster: { light: '/assets/images/graphics/ai/video-thumbnail-light.png', dark: '/assets/images/graphics/ai/video-thumbnail-dark.png' },
  videoSrc: '/assets/videos/test.mp4'
};

/***************************  BLOCK - HERO 16  ***************************/

export default function BlockHero16() {
  return <Hero16 {...data} />;
}
