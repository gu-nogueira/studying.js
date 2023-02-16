import '@/styles/global.scss';
import type { AppProps } from 'next/app';

// ** This is the default Next.js App component
// ** All pages will be wrapped by this component

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
