'use client';
import React, { createContext, useState } from 'react';

export type LoaderContextType = {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  loadOrHideLoader: (isLoading: boolean) => void;
};

export const LoaderContext = createContext<LoaderContextType | null>(null);

export const AppLoaderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);
  const loadOrHideLoader = (isLoading: boolean) => setIsLoading(isLoading);

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        showLoader,
        hideLoader,
        loadOrHideLoader,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};
