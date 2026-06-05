// @project
import { Integration9 } from '@/blocks/integration';

/***************************  INTEGRATION 9 - DATA  ***************************/

const data = {
  headLine: 'Sync your apps to boost your profile',
  captionLine:
    'Unlock the full power of your profile by seamlessly integrating your apps, ensuring a connected and optimized experience that enhances visibility, functionality, and overall impact.',
  primaryBtn: { children: 'See all Integration', sx: { textTransform: 'none' } },
  tagList: [
    { label: 'Slack', icon: 'tabler-brand-slack' },
    { label: 'Abstract', icon: 'tabler-brand-abstract' },
    { label: 'Asana', icon: 'tabler-brand-asana' },
    { label: 'Back Bone', icon: 'tabler-brand-backbone' },
    { label: 'Intercom', icon: 'tabler-brand-intercom' },
    { label: 'Master Card', icon: 'tabler-brand-mastercard' },
    { label: 'Skype', icon: 'tabler-brand-skype' },
    { label: 'Google Drive', icon: 'tabler-brand-google-drive' },
    { label: 'Tripadvisor', icon: 'tabler-brand-tripadvisor' },
    { label: 'Facebook Messenger', icon: 'tabler-brand-messenger' },
    { label: 'Paypal', icon: 'tabler-brand-paypal' }
  ]
};

/***************************  BLOCK - INTEGRATION 9  ***************************/

export default function BlockIntegration9() {
  return <Integration9 {...data} />;
}
