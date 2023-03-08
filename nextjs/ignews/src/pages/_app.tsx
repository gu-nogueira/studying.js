import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';

import { Header } from '@/components/Header';

import '@/styles/global.scss';

// ** This is the default Next.js App component
// ** All pages will be wrapped by this component

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    // ** Here we can add global components like Header, Footer, etc
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
