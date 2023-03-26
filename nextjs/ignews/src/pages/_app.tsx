import type { AppProps } from 'next/app';

// ** Providers
import { SessionProvider } from 'next-auth/react';
import { PrismicProvider } from '@prismicio/react';
import { PrismicPreview } from '@prismicio/next';

// ** Services
import { repositoryName } from '@/services/prismic';

// ** Components
import { Header } from '@/components/Header';
import Link from 'next/dist/client/link';

// ** Styles
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
      <PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
        <PrismicPreview repositoryName={repositoryName}>
          <Header />
          <Component {...pageProps} />
        </PrismicPreview>
      </PrismicProvider>
    </SessionProvider>
  );
}
