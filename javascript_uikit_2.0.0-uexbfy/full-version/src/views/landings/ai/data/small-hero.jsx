// @mui
import Typography from '@mui/material/Typography';

// @project
import branding from '@/branding.json';

function HeadlineText() {
  return (
    <Typography variant="h1" align="center">
      Collaborate to Develop Software
    </Typography>
  );
}

function HeadlineText2() {
  return (
    <Typography variant="h1" align="center">
      Question about SaasAI?
    </Typography>
  );
}

function HeadlineText3() {
  return (
    <Typography variant="h1" align="center">
      Code writing tool built with SaasAI
    </Typography>
  );
}

export const smallHero = {
  heading: 'Smart Features Boost Customer Satisfaction',
  caption: 'Explore features to improve customer interactions for more effective communication.',
  primaryBtn: { children: 'Get Started' },
  image: { light: '/assets/images/ai/graphics/graphics4-light.svg', dark: '/assets/images/ai/graphics/graphics4-dark.svg' }
};

export const smallHero1 = {
  chip: { label: 'Collaborate' },
  captionLine: `Using ${branding.brandName}'s collaborative code editor, you can write, review, and debug code anytime, anywhere.`,
  headLine: <HeadlineText />
};

export const smallHero2 = {
  chip: {
    label: 'Frequently ask questions'
  },
  captionLine: 'Discover the answers to frequently asked questions about AI chat.',
  headLine: <HeadlineText2 />
};

export const smallHero3 = {
  chip: {
    label: 'Solutions'
  },
  captionLine: `SaasAI harnesses the power of AI to help businesses automate routine tasks, unlock insights, and take action to improve efficiency and performance.`,
  headLine: <HeadlineText3 />
};
