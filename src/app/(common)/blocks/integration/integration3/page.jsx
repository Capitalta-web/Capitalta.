// @project
import branding from '@/branding.json';
import { Integration3 } from '@/blocks/integration';

/***************************  INTEGRATION 3 - DATA  ***************************/

const data = {
  headLine: `Connect your projects seamlessly with ${branding.brandName}.`,
  captionLine:
    'Witness the magic of seamless integration with SyncSphere. Connect projects, version histories, and workflows effortlessly.',
  primaryBtn: { children: 'See all Integration', sx: { textTransform: 'none' } }
};

/***************************  BLOCK - INTEGRATION 3  ***************************/

export default function BlockIntegration3() {
  return <Integration3 {...data} />;
}
