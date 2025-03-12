import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

// Create a cached query client that persists across requests
export const getQueryClient = cache(() => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 1000 * 60 * 60, // Keep unused data in cache for 1 hour
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });
});
