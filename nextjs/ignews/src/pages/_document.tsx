import { Html, Head, Main, NextScript } from 'next/document';

// ** This is the default Next.js Document component
// ** This is only rendered on the server side and not on the client side
// ** It can be compared on index.html file on the public folder in CRA

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        {/* Next script is where all .js files will be loaded, it will be always in the end of this Component */}
        <NextScript />
      </body>
    </Html>
  );
}
