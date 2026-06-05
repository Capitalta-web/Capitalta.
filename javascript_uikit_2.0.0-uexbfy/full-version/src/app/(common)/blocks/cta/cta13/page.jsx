// @project
import { Cta13 } from '@/blocks/cta';

/***************************  CALL TO ACTION 13 - DATA  ***************************/

const data = {
  heading: 'Join a winning team',
  caption: 'We’re looking for a mid-level product designer to join our team.',
  listData: [
    {
      title: 'Product Design',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: 'Remote'
        },
        {
          icon: 'tabler-history',
          name: 'Full-Time'
        }
      ],
      btn: { children: 'View Job' }
    },
    {
      title: 'Front-End Developer',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: 'Remote'
        },
        {
          icon: 'tabler-history',
          name: 'Full-Time'
        }
      ],
      btn: { children: 'View Job' }
    }
  ]
};

/***************************  CALL TO ACTION - 13  ***************************/

export default function BlockCta13() {
  return <Cta13 {...data} />;
}
