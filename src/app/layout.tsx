import React from 'react';
import { TokenProvider } from '@/lib/TokenContext';
import "./globals.scss"
import Token from '@/lib/token';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <TokenProvider>
      <div className='layout'>
        {children}
      </div>
    </TokenProvider>
  );
}
