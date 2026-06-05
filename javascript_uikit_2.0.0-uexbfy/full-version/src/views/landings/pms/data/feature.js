//@project
import { IconType } from '@/enum';

export const feature12 = {
  heading: 'Seamless collaboration tools',
  caption: 'Facilitate teamwork and communication with integrated chat, file sharing, and commenting features.',
  heading2: 'Predictive risk',
  caption2: 'Utilize machine learning algorithms to analyze historical project data and predict potential risks and challenges.',
  image: { light: '/assets/images/graphics/pms/desktop1-light.svg', dark: '/assets/images/graphics/pms/desktop1-dark.svg' },
  primaryBtn: { children: 'Get Started' },
  features: [
    {
      animationDelay: 0.2,
      icon: { name: 'tabler-settings-up', type: IconType.STROKE, color: 'text.primary', stroke: 1 },
      title: 'Automated resource',
      content: 'AI-driven resource allocation productivity by dynamically assigning tasks based on availability, skills, and project needs.'
    },
    {
      animationDelay: 0.4,
      icon: { name: 'tabler-briefcase', type: IconType.STROKE, color: 'text.primary', stroke: 1 },
      title: 'Virtual workspace',
      content: 'Integrate VR/AR for remote team collaboration in immersive virtual workspaces.'
    },
    {
      animationDelay: 0.2,
      icon: { name: 'tabler-brand-apple-arcade', type: IconType.STROKE, color: 'text.primary', stroke: 1 },
      title: 'Gamified task',
      content: 'Motivate and engage team members with gamified task management features, where completing tasks earns rewards.'
    },
    {
      animationDelay: 0.4,
      icon: { name: 'tabler-route', type: IconType.STROKE, color: 'text.primary', stroke: 1 },
      title: 'Adaptive workflow',
      content: 'Automate workflows that adapt dynamically to changing project conditions, priorities, or constraints, ensuring flexibility.'
    }
  ]
};

export const feature6 = {
  heading: 'Unlock powerful solutions',
  caption: 'Experience the transformative benefits of our platform tailored to your needs.',
  image: { light: '/assets/images/graphics/pms/desktop1-light.svg', dark: '/assets/images/graphics/pms/desktop1-dark.svg' },
  features: [
    {
      icon: 'tabler-chart-histogram',
      title: 'Enhanced efficiency',
      content: 'Streamline processes and workflows, reducing manual effort and saving time.'
    },
    {
      icon: 'tabler-devices-code',
      title: 'Improved collaboration',
      content: 'Facilitate seamless communication and collaboration among team members, regardless of location.'
    },
    {
      icon: 'tabler-keyframe-align-center',
      title: 'Greater visibility',
      content: 'Gain real-time insights into project status, progress, and performance, enabling better decision-making.'
    },
    {
      icon: 'tabler-settings-up',
      title: 'Increased productivity',
      content: 'Empower teams to work smarter and accomplish more, leading to higher productivity and output.'
    }
  ]
};
