import { TokenProvider } from '@/lib/TokenContext';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TokenProvider>
      <Component {...pageProps} />
    </TokenProvider>
  );
}
