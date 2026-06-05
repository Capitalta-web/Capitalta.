// @project
import branding from '@/branding.json';

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

export const blogDetails = {
  date: '24 may 2024 · Design · 10 Min Read',
  heading: 'AI-Powered LMS Platforms: The Future of Learning?',
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
  mainImage: '/assets/images/lms/blog/blog-6.png',
  title: 'Introduction',
  description:
    'With increasing awareness about digital carbon footprints, many hosting providers are stepping up with eco-conscious initiatives—without compromising performance, support, or affordability. Here are the leading green web hosts making an impact in 2025:',
  blogDetails: [
    {
      title: 'Personalized, Adaptive Learning',
      content: (
        <>
          AI interprets learner behavior, performance, and preferences to craft individualized learning paths. Adaptive systems such as
          Squirrel AI track micro-skill mastery, iteratively adjusting content in real time.
          <br />
          Studies show 86% of adaptive learning implementations boost outcomes.
        </>
      )
    },

    {
      title: 'Conversational Interfaces & Instant Guidance',
      content: (
        <>
          Gone are labyrinthine menus—modern learners expect chat‑style access. AI chatbots let users ask, “Which course certifies me next?”
          and receive tailored recommendations instantly.
          <br />
          These dialog-driven experiences are becoming the standard across enterprise LMSes like Litmos.
        </>
      )
    },

    {
      title: 'Intelligent Assessments & Predictive Analytics',
      content: (
        <>
          AI enables dynamic assessments that adapt mid‑quiz based on learner responses; auto‑grading of complex assignments reduces
          instructor burden. Predictive analytics flag at‑risk learners early for timely intervention.
        </>
      ),
      dotList: [
        {
          title: 'Kira Learning (Andrew Ng):',
          description: ' AI agents grade, plan lessons, tutor, create knowledge maps in Tennessee schools.'
        },
        {
          title: 'Khanmigo (Khan Academy): ',
          description: ' AI tutor supporting 4 million+ students with instant guidance and teacher support.'
        },
        {
          title: 'Aulasneo’s “Owly”:',
          description: ' AI assistant launched for Open edX, enabling automation within enterprise environments.'
        },
        {
          title: 'Docebo’s AI:',
          description: 'Integrated ML, NLP and deep learning since 2018 to drive personalization on its LMS platform.'
        }
      ]
    },

    {
      title: 'Why It Matters Now',
      dotList: [
        {
          title: ' Learner engagement:',
          description: ' Personalized, adaptive systems improve completion and satisfaction rates.'
        },
        {
          title: 'Efficiency:',
          description: ' Educators save time through automation, freeing them for mentorship and creativity.'
        },
        {
          title: 'Scalability: ',
          description: ' Few instructors can’t limit reach—AI scales quality learning to larger audiences.'
        },
        {
          title: 'Business impact: ',
          description: ' Corporate LMS with AI support upskilling, compliance, retention—and better ROI.'
        }
      ]
    }
  ]
};
