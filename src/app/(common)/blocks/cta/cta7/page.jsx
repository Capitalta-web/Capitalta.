// @mui
import Typography from '@mui/material/Typography';

// @project
import branding from '@/branding.json';
import { Cta7 } from '@/blocks/cta';

/***************************  CALL TO ACTION 7 - HEADLINE  ***************************/

function HeadlineText() {
  return (
    <Typography variant="h2">
      Explore parallel processing with {branding.brandName}.{' '}
      <Typography variant="h2" component="span" sx={{ color: 'primary.main' }}>
        Transform your data experience now!
      </Typography>
    </Typography>
  );
}

/***************************  CALL TO ACTION 7 - DATA  ***************************/

const data = {
  headLine: <HeadlineText />,
  primaryBtn: { children: '30 Days free trial', sx: { textTransform: 'none' } },
  caption: `Outstanding customer support! They're responsive and go above and beyond to ensure a smooth experience.`
};

/***************************  BLOCK - CALL TO ACTION 7  ***************************/

export default function BlockCta7() {
  return <Cta7 {...data} />;
}
