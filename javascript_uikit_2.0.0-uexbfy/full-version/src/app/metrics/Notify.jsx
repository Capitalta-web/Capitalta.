import PropTypes from 'prop-types';
// Pixel Code - https://phpstack-207002-5085356.cloudwaysapps.com/
import Script from 'next/script';

export default function Notify({ notifyId }) {
  return <Script defer strategy="lazyOnload" src={`https://fomo.codedthemes.com/pixel/${notifyId}`} />;
}

Notify.propTypes = { notifyId: PropTypes.string };
