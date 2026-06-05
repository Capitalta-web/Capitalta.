// @project
import { Gallery1 } from '@/blocks/gallery';

/***************************  GALLERY 1 - DATA  ***************************/

const data = {
  heading: 'Explore our team',
  caption: 'Discover the features that will transform your customer relationships.',
  images: [
    { src: '/assets/images/gallery/gallery1.png' },
    { src: '/assets/images/gallery/gallery2.png' },
    { src: '/assets/images/gallery/gallery3.png' },
    { src: '/assets/images/gallery/gallery4.png' },
    { src: '/assets/images/gallery/gallery5.png' },
    { src: '/assets/images/gallery/gallery6.png' },
    { src: '/assets/images/gallery/gallery7.png' }
  ]
};

/***************************  BLOCK - GALLERY 1  ***************************/

export default function BlockGallery1() {
  return <Gallery1 {...data} />;
}
