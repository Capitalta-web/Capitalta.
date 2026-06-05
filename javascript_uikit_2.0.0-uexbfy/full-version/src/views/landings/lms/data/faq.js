// @project
import { ListBadgeColors } from '@/enum';

export const faq = {
  heading: 'Frequently ask questions',
  caption: 'With advanced analytics and reporting, you can track customer behavior, sales trends, & many more to make.',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: 'In how many students is a course taught?',
      answer:
        'The number of students in a course varies depending on the institution and course type. Some online courses have unlimited enrollment, while others may have smaller class sizes for better interaction and personalized attention.'
    },
    {
      question: 'What is the process of online learning?',
      answer:
        'Online learning involves accessing course materials through a digital platform, participating in discussions, completing assignments, and taking assessments. It offers flexibility, allowing students to learn at their own pace while interacting with instructors and peers virtually.'
    },
    {
      question: 'What benefits does online education offer?',
      answer:
        'Online education provides flexibility, accessibility, and a wide range of learning resources. It allows students to learn from anywhere, balance studies with other responsibilities, and access diverse course options that may not be available locally.'
    },
    {
      question: 'Can I progress at my own speed while learning?',
      answer:
        'Absolutely, progressing at your own pace is a key component of effective learning. It allows you to absorb, understand, and retain information more effectively, without the pressure of keeping up with others.'
    },
    {
      question: 'What kind of analytics and reporting does your LMS provide?',
      answer:
        'Our LMS provides detailed analytics on customer interactions, sales performance, and marketing campaigns. It includes customizable reports, real-time insights, and predictive analytics to help businesses make data-driven decisions and optimize their customer relationships.'
    }
  ]
};

export const Faq1 = {
  heading: 'Course table of content',
  caption: 'Explore the structure and topics covered in this course.',
  defaultExpanded: 'panel3',
  faqList: [
    {
      question: 'Lesson 1: Introduction to Digital Marketing',
      answer:
        'Digital marketing involves using online channels such as websites, social media, search engines, and email to promote products or services. It plays a crucial role in reaching wider audiences, building brand awareness, and driving business growth in today’s digital-first world.'
    },
    {
      question: 'Lesson 2: Content Marketing and Strategy',
      answer:
        'Content marketing focuses on creating and distributing valuable, relevant content to attract and retain a target audience. A strong strategy helps businesses build brand awareness, engage customers, and drive profitable actions.'
    },
    {
      question: 'Lesson 3: Search Engine Optimization (SEO) Basics',
      answer:
        'SEO is the practice of optimizing websites to rank higher in search engine results. It involves keyword research, content optimization, and link-building to increase visibility and attract organic traffic.'
    },
    {
      question: 'Lesson 4: Social Media Marketing',
      answer: {
        type: 'list',
        data: [
          { primary: `Choosing the right social media platforms for your business.` },
          { primary: 'Best practices for content creation and community engagement.' },
          { primary: 'Understanding paid social media campaigns and targeting.' }
        ],
        color: ListBadgeColors.WHITE
      }
    },
    {
      question: 'Lesson 5: Email Marketing Campaigns',
      answer:
        'Email marketing uses targeted messages to reach subscribers directly. Effective campaigns include personalized content, strong subject lines, and performance tracking to boost engagement and conversions.'
    }
  ]
};
