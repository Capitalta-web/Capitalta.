// @mui
import Typography from '@mui/material/Typography';

// @project
import branding from '@/branding.json';

function HeadlineText() {
  return (
    <Typography variant="h1" align="center" sx={{ width: { xs: 343, sm: 700, md: 795 } }}>
      Stay in the Loop with the Newest Features
    </Typography>
  );
}

function HeadlineText2() {
  return (
    <Typography variant="h1" align="center" sx={{ width: { sm: 500, md: 795 } }}>
      One Plan, All you Need for Crypto Success
    </Typography>
  );
}

function HeadlineText3() {
  return (
    <Typography variant="h1" align="center" sx={{ width: { sm: 590, md: 750 } }}>
      Discover the Latest Innovations in Blockchain
    </Typography>
  );
}

function HeadlineText4() {
  return (
    <Typography variant="h1" align="center" sx={{ width: { sm: 590, md: 750 } }}>
      Reach Out to our Support Team for Help
    </Typography>
  );
}

function HeadlineText5() {
  return (
    <Typography variant="h1" align="center" sx={{ width: { sm: 590, md: 750 } }}>
      Find Solutions to Frequently Asked Questions
    </Typography>
  );
}

function HeadlineText6() {
  return (
    <Typography variant="h1" align="center">
      Privacy Policy
    </Typography>
  );
}

export const smallHero = {
  chip: {
    label: 'Crypto Features'
  },
  captionLine: 'Discover the newest updates and innovations crafted to elevate your experience with every feature.',
  headLine: <HeadlineText />
};

export const smallHero2 = {
  chip: {
    label: 'Pricing Plan'
  },
  captionLine: 'Choose from a range of flexible plans designed to meet your specific needs.',
  headLine: <HeadlineText2 />
};

export const smallHero3 = {
  chip: {
    label: 'Latest Posts'
  },
  captionLine: 'Explore in-depth articles on the cutting-edge world of blockchain technology and cryptocurrencies.',
  headLine: <HeadlineText3 />
};

export const smallHero4 = {
  chip: {
    label: 'Contact Us'
  },
  captionLine: 'If you need any help, feel free to reach out to our support team.',
  headLine: <HeadlineText4 />
};

export const smallHero5 = {
  chip: {
    label: `FAQ's`
  },
  captionLine: 'Finding solutions to frequently asked questions can save time and improve your understanding of important topics',
  headLine: <HeadlineText5 />
};

export const smallHero6 = {
  chip: {
    label: 'Privacy Policy'
  },
  captionLine: `This Privacy Policy describes how ${branding.brandName} we collects, uses, and shares information about you when you use our website or services.`,
  headLine: <HeadlineText6 />
};
