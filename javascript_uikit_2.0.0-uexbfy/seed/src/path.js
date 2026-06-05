function path(urlChunks) {
  return urlChunks.join('/');
}

export const SECTION_PATH = '/sections';
export const ADMIN_PATH = 'https://admin.saasable.io/';
export const BUY_NOW_URL = 'https://mui.com/store/items/saasable-multipurpose-ui-kit-and-dashboard-template';
export const FREEBIES_URL = 'https://github.com/phoenixcoded/saasable-ui';
export const DOCS_URL = 'https://phoenixcoded.gitbook.io/saasable ';
const BLOCK_PATH = '/blocks';

export const LANDING_PATH = {
  default: '/'
};

export const PAGE_PATH = {
  about: path([SECTION_PATH, 'about']),
  comingSoon: path([SECTION_PATH, 'coming-soon']),
  error404: path([SECTION_PATH, 'error404']),
  error500: path([SECTION_PATH, 'error500']),
  underMaintenance: path([SECTION_PATH, 'under-maintenance']),

  // pages path
  aboutPage: '/about',
  careerPage: '/career',
  contactPage: '/contact',
  faqPage: '/faq',
  pricingPage: '/pricing',
  privacyPolicyPage: '/privacy-policy',
  termsConditionPage: '/terms-condition'
};

export const PRIVIEW_PATH = {
  comingSoon: path([BLOCK_PATH, 'coming-soon']),
  error404: path([BLOCK_PATH, 'error404']),
  error500: path([BLOCK_PATH, 'error500']),
  underMaintenance: path([BLOCK_PATH, 'under-maintenance'])
};
