// @project
import { Gallery2 } from '@/blocks/gallery';

/***************************  GALLERY 2 - DATA  ***************************/

const data = {
  heading: 'Explore our team',
  caption: 'Discover the features that will transform your customer relationships.',
  images: [
    { src: '/assets/images/gallery/gallery1.png' },
    { src: '/assets/images/gallery/gallery2.png' },
    { src: '/assets/images/gallery/gallery3.png' },
    { src: '/assets/images/gallery/gallery4.png' }
  ]
};

/***************************  BLOCK - GALLERY 2  ***************************/

export default function BlockGallery2() {
  return <Gallery2 {...data} />;
}
