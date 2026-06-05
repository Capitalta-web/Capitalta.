import PropTypes from 'prop-types';
import Script from 'next/script';

export default function GTag({ gaId }) {
  return <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />;
}

GTag.propTypes = { gaId: PropTypes.string };
