// @mui
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

export const hero = {
  chip: {
    label: (
      <>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          One Kit, Endless
        </Typography>
        <Chip
          label="Possibilities"
          slotProps={{ label: { sx: { px: 1.5, typography: 'caption', color: 'primary.main' } } }}
          sx={{ height: 24, bgcolor: 'primary.lighter', mr: -1, ml: 0.75 }}
          icon={
            <CardMedia
              component="img"
              image="/assets/images/shared/celebration.gif"
              sx={{ width: 16, height: 16, pl: 0.5 }}
              alt="celebration"
              loading="lazy"
            />
          }
        />
      </>
    )
  },
  headLine: 'Multipurpose UI Kit and Dashboard Template',
  captionLine: 'Design marketing pages and powerful admin dashboards with ease using our UI Kit, built following Material 3 guidelines.',
  primaryBtn: { children: 'Explore Blocks', href: '/' },
  videoSrc: 'https://d2elhhoq00m1pj.cloudfront.net/saasable-intro.mp4',
  videoThumbnail: '/assets/videos/thumbnails/intro-thumbnail.png',
  listData: [
    { image: '/assets/images/shared/react.svg', title: 'React 19' },
    { image: '/assets/images/shared/next-js.svg', title: 'Next.js' },
    { image: '/assets/images/shared/material-ui.svg', title: 'Material UI v7' },
    { image: '/assets/images/shared/typescript.svg', title: 'TypeScript' },
    { image: '/assets/images/shared/javascript.svg', title: 'JavaScript' },
    { image: '/assets/images/shared/m3.svg', title: 'Material 3' },
    { image: '/assets/images/shared/figma.svg', title: 'Figma' }
  ]
};
