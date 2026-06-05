// @mui
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

// @project
import { Hero17 } from '@/blocks/hero';

/***************************  HERO 17 - DATA  ***************************/

const data = {
  chip: {
    label: (
      <>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Over 200+
        </Typography>
        <Chip
          label="Design Blocks"
          slotProps={{ label: { sx: { px: 1.25, color: 'primary.main', typography: 'caption' } } }}
          sx={{ height: 24, bgcolor: 'primary.lighter', mr: -1, ml: 0.75 }}
          icon={
            <CardMedia
              component="img"
              image="/assets/images/shared/celebration.svg"
              sx={{ width: 16, height: 16 }}
              alt="celebration"
              loading="lazy"
            />
          }
        />
      </>
    )
  },
  headLine: 'Real-Time Performance Monitoring',
  captionLine: 'Identify and resolve issues proactively for uninterrupted operations.',
  primaryBtn: { children: 'Try predictive cost analytics', sx: { textTransform: 'none' } },
  videoSrc: 'https://d2elhhoq00m1pj.cloudfront.net/Capitalta-intro.mp4',
  videoThumbnail: '/assets/videos/thumbnails/intro-thumbnail.png',
  listData: [
    { image: '/assets/images/shared/react.svg', title: 'React 19' },
    { image: '/assets/images/shared/material-ui.svg', title: 'Material UI v7' },
    { image: '/assets/images/shared/typescript.svg', title: 'TypeScript' },
    { image: '/assets/images/shared/javascript.svg', title: 'JavaScript' },
    { image: '/assets/images/shared/m3.svg', title: 'Material 3' }
  ]
};

/***************************  BLOCK - HERO 17  ***************************/

export default function BlockHero17() {
  return <Hero17 {...data} />;
}
