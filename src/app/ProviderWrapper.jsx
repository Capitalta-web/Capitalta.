import PropTypes from 'prop-types';
import { ConfigProvider } from '@/contexts/ConfigContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Locales from '@/components/Locales';

/***************************  COMMON - CONFIG, THEME  ***************************/

export default function ProviderWrapper({ children }) {
  return (
    <ConfigProvider>
      <Locales>
        <AuthProvider>{children}</AuthProvider>
      </Locales>
    </ConfigProvider>
  );
}

ProviderWrapper.propTypes = { children: PropTypes.any };
