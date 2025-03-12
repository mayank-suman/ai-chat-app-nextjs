import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

// Create a cached query client that persists across requests
export const getQueryClient = cache(() => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 15 * 60 * 1000, // Keep unused data in cache for 15 minutes
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });
});
