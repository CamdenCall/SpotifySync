import type { AppProps } from 'next/app';
import { SongContextProvider, useSongContext } from '@/lib/UserContext' 

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SongContextProvider>
      <Component {...pageProps} />
    </SongContextProvider>
  );
}
