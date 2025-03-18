import { LoaderContext } from '@/components/providers/app-loader-provider';
import { useContext } from 'react';

export const useAppLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};
