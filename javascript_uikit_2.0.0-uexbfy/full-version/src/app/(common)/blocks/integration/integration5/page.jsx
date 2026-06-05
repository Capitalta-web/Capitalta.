// @project
import { Integration5 } from '@/blocks/integration';

/***************************  INTEGRATION 5 - DATA  ***************************/

const data = {
  headLine: 'Connect with top-tier tools',
  captionLine: 'Discover the features that will transform your customer relationships.',
  primaryBtn: { children: 'See all Integration', sx: { textTransform: 'none' } }
};

/***************************  BLOCK - INTEGRATION 5  ***************************/

export default function BlockIntegration5() {
  return <Integration5 {...data} />;
}
