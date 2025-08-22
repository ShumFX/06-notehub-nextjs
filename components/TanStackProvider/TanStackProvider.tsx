'use client';

import React, { useState, type ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  type DehydratedState,
} from '@tanstack/react-query';

interface TanStackProviderProps {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}

const TanStackProvider: React.FC<TanStackProviderProps> = ({
  children,
  dehydratedState,
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 хв
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default TanStackProvider;

