import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Price Checker</title>
    </Head>
    <Component {...pageProps} />
  </>;
};

export default App;