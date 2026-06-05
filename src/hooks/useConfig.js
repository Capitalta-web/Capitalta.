import { useContext, useMemo } from 'react';

// @project
import { ConfigContext } from '@/contexts/ConfigContext';
import config from '@/config';

/***************************  HOOKS - CONFIG  ***************************/

export default function useConfig() {
  const context = useContext(ConfigContext);

  const fallback = useMemo(
    () => ({
      state: config,
      setState: () => {},
      setField: () => {},
      resetState: () => {}
    }),
    []
  );

  return context || fallback;
}
