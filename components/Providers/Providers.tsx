'use client';

import { ReactNode } from 'react';
import TanStackProvider from '../TanStackProvider/TanStackProvider';

export default function Providers({ children }: { children: ReactNode }) {
  return <TanStackProvider>{children}</TanStackProvider>;
}

