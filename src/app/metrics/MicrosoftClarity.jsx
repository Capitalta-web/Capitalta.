import PropTypes from 'prop-types';
import Script from 'next/script';

export default function MicrosoftClarity({ clarityId }) {
  const clarityScript = `
    (function(c,l,a,r,i,t,y) {
      c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "${clarityId}");
  `;

  return (
    <Script
      // Unique ID for the inline script
      id="microsoft-clarity-script"
      // Loads after the page is interactive
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: clarityScript }}
    />
  );
}

MicrosoftClarity.propTypes = { clarityId: PropTypes.string };
