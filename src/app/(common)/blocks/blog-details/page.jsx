// @project
import branding from '@/branding.json';
import BlogDetails from '@/blocks/BlogDetails';

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

/***************************  BLOG DETAILS - DATA  ***************************/

const data = {
  date: '24 May 2024 · Design · 10 Min Read',
  heading: 'Exploring the design thinking process: A guide for innovators',
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
  mainImage: '/assets/images/blog/blog20.jpg',
  title: 'What is design thinking?',
  description:
    'Design thinking is a problem-solving framework that encourages teams to empathize with users, define problems clearly, ideate creatively, prototype quickly, and test iteratively. This process is particularly valuable in tackling complex challenges that are ill-defined or unknown. By focusing on human needs, design thinking fosters innovation and leads to products and services that truly resonate with users.',
  subTitle: 'The five stages of design thinking',
  blogDetails: [
    {
      title: 'Empathize',
      content: (
        <>
          The first stage, Empathize, involves understanding the needs, thoughts, emotions, and motivations of users. This stage requires
          you to step into the users&apos; shoes and experience the problem from their perspective. Techniques such as user interviews,
          surveys, observation, and empathy mapping are crucial here.
          <br />
          Example: Imagine you&apos;re designing a new app for managing personal finances. During the empathize stage, you might interview
          users to understand their frustrations with current financial management tools, observe their daily financial habits, and map out
          their emotional journey when dealing with money.
        </>
      )
    },

    {
      title: 'Define',
      content: (
        <>
          In the Define stage, you synthesize your observations and insights from the Empathize stage to clearly articulate the problem you
          aim to solve. This involves creating a problem statement that is user-centered and actionable.
          <br />
          Example: Based on your empathy research, you might define the problem statement as: &quot;Young professionals need an intuitive
          and engaging way to track their spending because existing tools are too complex and time-consuming.&quot;
        </>
      )
    },

    {
      title: 'Ideate',
      content: (
        <>
          The Ideate stage is all about generating a wide range of ideas and solutions. Creativity and brainstorming are key here. Encourage
          wild ideas and defer judgment to foster an open environment where innovation can thrive.
          <br />
          Example: In our financial app scenario, ideation might involve brainstorming sessions where your team generates ideas like a
          gamified spending tracker, an AI-powered budgeting assistant, or a social feature for sharing savings tips.
        </>
      )
    },

    {
      title: 'Prototype',
      content: (
        <>
          Prototyping is the phase where ideas come to life. Create low-fidelity versions of your solutions to explore their viability and
          usability. Prototypes can be anything from sketches and paper models to digital mockups and interactive simulations.
          <br />
          Example: You might create wireframes and clickable prototypes of the top three ideas from your ideation session. These prototypes
          should be just detailed enough to convey the concept and allow for basic user interaction.
        </>
      )
    },

    {
      title: 'Test',
      content: (
        <>
          The Test stage involves gathering feedback from real users on your prototypes. This is an iterative process where you refine your
          solutions based on user feedback. Testing helps you identify what works, what doesn &apos;t, and why.
          <br />
          Example: You test your financial app prototypes with a group of target users. Through usability testing sessions, you gather
          insights on their preferences, pain points, and overall experience. Based on this feedback, you iterate and improve the app.
        </>
      )
    }
  ]
};

/***************************  BLOCK - BLOG DETAILS  ***************************/

export default function BlockBlogDetails() {
  return <BlogDetails {...data} />;
}
