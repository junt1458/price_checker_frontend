import { AppProps } from 'next/app';
import Head from 'next/head';
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

const ContentSwitcher: React.FunctionComponent<{ children: JSX.Element }> = ({ children }) => {
  const { isLoginChecking } = useLoginState();
  return isLoginChecking ? <>Loading...</> : children;
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
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
