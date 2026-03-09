import PropTypes from 'prop-types';
import { ConfigProvider } from '@/contexts/ConfigContext';
import { AuthProvider } from '@/contexts/AuthContext';

/***************************  COMMON - CONFIG, THEME  ***************************/

export default function ProviderWrapper({ children }) {
  return (
    <ConfigProvider>
      <AuthProvider>{children}</AuthProvider>
    </ConfigProvider>
  );
}

ProviderWrapper.propTypes = { children: PropTypes.any };
