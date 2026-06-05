// @project
import branding from '@/branding.json';

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

export const blogDetails = {
  date: '24 May 2024 · Design · 10 Min Read',
  heading: 'The Ultimate Guide to AI-Powered Software Development',
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
  mainImage: '/assets/images/ai/blog/blog2.png',
  title: '🚀 Introduction: The AI Revolution in Software Development',
  description:
    'AI is rapidly transforming the landscape of software development, extending far beyond simple autocomplete. In 2025, intelligent agents, generative models, and natural‑language interfaces are reshaping every stage of the development lifecycle—from design to deployment.',

  blogDetails: [
    {
      title: 'Agentic AI: Autonomous Systems Taking Charge',
      content: (
        <>
          Agentic AI refers to autonomous tools that proactively take on tasks like bug fixes, tests, and environments setup—far beyond just
          answering prompts. By 2025, over 60% of enterprises are expected to implement such systems, reducing manual overhead by nearly
          40%.
        </>
      ),
      dotList: [
        { description: 'Generating and executing code' },
        { description: 'Proactively detecting and creating fix tickets' },
        { description: 'Autonomously scaling test coverage' }
      ]
    },
    {
      title: 'Code Generation Tools: From Snippets to Systems',
      content: (
        <>
          Leading tools like GitHub Copilot, Cursor, Tabnine, Codeium, and Replit are advancing from simple code suggestions to
          full-featured assistants. For example, Copilot’s “Agent Mode” can analyze and update multiple files, run tests, and propose PR
          self-summaries.
          <br />
          These tools let developers express tasks in natural language and receive production-ready code with error-handling, documentation,
          and compliance baked in.
          <br />
          AI tools now assist with architecture design—suggesting microservice boundaries, API schemas, and performance modeling. In
          parallel, Edge AI enables real-time analytics in IoT and autonomous environments
        </>
      )
    },
    {
      title: 'Looking Ahead: The Future of AI‑Powered Development',
      dotList: [
        { description: 'Evolving AI agents: More context-aware, proactive, and collaborative systems.' },
        { description: 'Democratization continues: Built-in AI for citizen developers on no-code platforms.' },
        { description: 'Ethical and regulatory frameworks: Increasingly mandatory in key industries.' },
        { description: 'Next-gen IDEs: AI-first tools with full agent capabilities (Cursor, Copilot, Tabnine, Replit...).' }
      ]
    },
    {
      title: 'AI-Driven Testing & Quality Assurance',
      dotList: [
        { description: 'Auto-generates unit and integration tests' },
        { description: 'Pinpoints edge-case bugs' },
        { description: 'Identifies vulnerabilities & code smells' }
      ]
    },
    {
      title: 'Intelligent DevOps & Performance Monitoring',
      content: (
        <>
          In summary, Intelligent DevOps with performance monitoring transforms reactive pipelines into proactive, self-optimizing systems.
          It&apos;s not just tech—it’s a shift in mindset: code quality, infrastructure health, security, and cost-efficiency all governed
          by AI insights.
        </>
      ),

      dotList: [
        { description: 'Predicting infra bottlenecks' },
        { description: 'Automated rollbacks on anomalies' },
        { description: 'Optimal resource provisioning and scaling' },
        { description: 'Explainable AI (XAI) for model behavior tracking' },
        { description: 'Regulatory alignment with GDPR/AI Act' },
        { description: 'Bias audits and fairness checks built into development' }
      ]
    }
  ]
};
