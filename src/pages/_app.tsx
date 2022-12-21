import { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import { useSetRecoilState, RecoilRoot } from 'recoil';
import { useLoginState } from '../hooks/useLoginState';
import { loginState } from '../states/loginState';
import '../styles/globals.css';

const AppInit: React.FunctionComponent = () => {
  const setLoginState = useSetRecoilState(loginState);

  useEffect(() => {
    const asyncProcess = async () => {
      // NOTE: ここでトークンの確認などを行う場合には処理を追記する
      const cookies = parseCookies();
      setLoginState(cookies.token != null);
    };

    asyncProcess();
  });

  return null;
};

const LoadingScreen: React.FunctionComponent = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='block text-center'>
        <Image src='/static/loading.svg' width={128} height={128} alt='Loading Spinner' />
        読み込み中...
      </div>
    </div>
  );
};

const ContentSwitcher: React.FunctionComponent<{ children: JSX.Element }> = ({ children }) => {
  const { isLoginChecking } = useLoginState();
  return isLoginChecking ? <LoadingScreen /> : children;
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <link rel='apple-touch-icon' sizes='180x180' href='/static/favicon/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon/favicon-16x16.png' />
        <link rel='manifest' href='/static/favicon/site.webmanifest' />
        <link rel='mask-icon' href='/static/favicon/safari-pinned-tab.svg' color='#5bbad5' />
        <link rel='shortcut icon' href='/static/favicon/favicon.ico' />
        <meta name='msapplication-TileColor' content='#ffc40d' />
        <meta name='msapplication-config' content='/static/favicon/browserconfig.xml' />
        <meta name='theme-color' content='#ffffff' />

        <title>Price Checker</title>
      </Head>
      <ContentSwitcher>
        <Component {...pageProps} />
      </ContentSwitcher>
      <AppInit />
    </RecoilRoot>
  );
};

export default App;
