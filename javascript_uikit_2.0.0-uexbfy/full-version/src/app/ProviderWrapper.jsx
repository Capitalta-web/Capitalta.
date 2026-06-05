import PropTypes from 'prop-types';
import { ConfigProvider } from '@/contexts/ConfigContext';

/***************************  COMMON - CONFIG, THEME  ***************************/

export default function ProviderWrapper({ children }) {
  return <ConfigProvider>{children}</ConfigProvider>;
}

ProviderWrapper.propTypes = { children: PropTypes.any };
