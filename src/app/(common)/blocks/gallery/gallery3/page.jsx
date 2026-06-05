// @project
import { Gallery3 } from '@/blocks/gallery';

/***************************  GALLERY 3 - DATA  ***************************/

const data = {
  heading: 'Explore our team',
  caption: 'Discover the features that will transform your customer relationships.',
  images: [
    { src: '/assets/images/gallery/gallery1.png' },
    { src: '/assets/images/gallery/gallery2.png' },
    { src: '/assets/images/gallery/gallery7.png' },
    { src: '/assets/images/gallery/gallery6.png' },
    { src: '/assets/images/gallery/gallery4.png' },
    { src: '/assets/images/gallery/gallery5.png' },
    { src: '/assets/images/gallery/gallery3.png' }
  ]
};

/***************************  BLOCK - GALLERY 3  ***************************/

export default function BlockGallery3() {
  return <Gallery3 {...data} />;
}
