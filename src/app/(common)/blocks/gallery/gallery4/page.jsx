// @project
import { Gallery4 } from '@/blocks/gallery';

/***************************  GALLERY 4 - DATA  ***************************/

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
  ],
  topics: ['Getting Started', 'Security & Safety', 'Fees & Charges', 'Technical Support & Assistance', 'Regulation & Compliance']
};

/***************************  BLOCK - GALLERY 4  ***************************/

export default function BlockGallery4() {
  return <Gallery4 {...data} />;
}
