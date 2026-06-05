// @project
import { Integration8 } from '@/blocks/integration';

/***************************  INTEGRATION 8 - DATA  ***************************/

const data = {
  headLine: 'Workflow orchestrator integration',
  captionLine:
    'Integrate FlexFlow seamlessly as your workflow orchestrator. Elevate collaboration and automation with efficient integration solutions.',
  primaryBtn: { children: 'See all Integration', sx: { textTransform: 'none' } }
};

/***************************  BLOCK - INTEGRATION 8  ***************************/

export default function BlockIntegration8() {
  return <Integration8 {...data} />;
}
