// @project
import branding from '@/branding.json';

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

export const blogDetails = {
  date: '24 may 2024 · Design · 10 Min Read',
  heading: 'Hosting Spotlight: Top Eco-Friendly Providers for 2025',
  image: {
    src: '/assets/images/user/avatar5.png',
    name: 'Tricia Yundt',
    role: 'Project Manager'
  },
  socialIcons: [
    {
      icon: 'tabler-filled-linkedin',
      link: { href: `${branding.company.socialLink.linkedin}`, ...linkProps }
    },
    {
      icon: 'tabler-filled-facebook',
      link: { href: `${branding.company.socialLink.facebook}`, ...linkProps }
    },
    {
      icon: 'tabler-filled-youtube',
      link: { href: `${branding.company.socialLink.youtube}`, ...linkProps }
    },
    {
      icon: 'tabler-filled-brand-github',
      link: { href: `${branding.company.socialLink.github}`, ...linkProps }
    },
    {
      icon: 'tabler-filled-dribble',
      link: { href: `${branding.company.socialLink.dribble}`, ...linkProps }
    }
  ],
  mainImage: '/assets/images/hosting/blog/blog1.jpg',
  description:
    'With increasing awareness about digital carbon footprints, many hosting providers are stepping up with eco-conscious initiatives—without compromising performance, support, or affordability. Here are the leading green web hosts making an impact in 2025:',
  subTitle: 'The five stages of design thinking',
  blogDetails: [
    {
      title: 'GreenGeeks',
      content: (
        <>
          Why it stands out: Carbon-negative host—purchasing 300% renewable energy credits—and commits to nightly backups, SSD performance,
          and solid uptime.
          <br />
          Pricing: Shared hosting from ~$2.95/mo.
          <br />
          Best for: Individuals and small-to-medium websites that want strong sustainability with reliable features.
        </>
      )
    },

    {
      title: 'A2 Hosting',
      content: (
        <>
          Why it stands out: 100% carbon-neutral; partners with Carbonfund.org; upgraded green data centers increasingly powered by solar;
          high‑speed “Turbo” servers .
          <br />
          Pricing: Starting at ~$2.99/mo.
          <br />
          Best for: Developers and businesses who need both environmental responsibility and swift server performance.
        </>
      )
    },

    {
      title: 'Feature-Rich Hosting',
      content: (
        <>
          All plans include SSD storage, daily backups, free SSL and domain (1st year), unlimited bandwidth.
          <br />
          Developer tools: Git, WP-CLI, SSH, cPanel, one-click CMS installs (150+ apps)
          <br />
          WordPress optimized with LiteSpeed cache, auto-updates, and WooCommerce support
          <br />
          Real-world speed tests: fast response in North America, under 1 s in India/Asia—commendable for shared hosting
          <br />
          Uptime guarantee of 99.9%, often registering 100% in tests
        </>
      )
    },

    {
      title: 'Eco Web Hosting',
      content: (
        <>
          Why it stands out: 100% renewable-powered UK servers; plants trees per plan; strong tree-planting and carbon-offset program .
          <br />
          Pricing: ~£3.49–£14.59/mo depending on plan.
          <br />
          Best for: Those looking for measurable environmental actions (like tree planting) alongside UK-based services.
        </>
      )
    },

    {
      title: 'Why Choose Web Hosting',
      content: (
        <>
          The Test stage involves gathering feedback from real users on your prototypes. This is an iterative process where you refine your
          solutions based on user feedback. Testing helps you identify what works, what doesn&apos;t, and why.
          <br />
          Example: You test your financial app prototypes with a group of target users. Through usability testing sessions, you gather
          insights on their preferences, pain points, and overall experience. Based on this feedback, you iterate and improve the app.
        </>
      )
    }
  ]
};
