import React from 'react';
import "./globals.scss"
import Token from '@/lib/token';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
      <div className='layout'>
        {children}
      </div>
  );
}
