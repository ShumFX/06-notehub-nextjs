'use client';

import React, { type ReactNode } from 'react';
import TanStackProvider from '../TanStackProvider/TanStackProvider';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <TanStackProvider>
      {children}
    </TanStackProvider>
  );
};

export default Providers;
