import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

/***************************  CONTENT - INNER HTML  ***************************/

function HtmlRenderer({ htmlString }) {
  const sanitized = DOMPurify.sanitize(htmlString);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}

export default HtmlRenderer;

HtmlRenderer.propTypes = { htmlString: PropTypes.string };
