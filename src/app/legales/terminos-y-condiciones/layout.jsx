import PropTypes from 'prop-types';

// @project
import { SEO_CONTENT } from '@/metadata';

export const metadata = { ...SEO_CONTENT.terminos };

export default function Layout({ children }) {
  return children;
}

Layout.propTypes = { children: PropTypes.any };
