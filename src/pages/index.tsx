import { NextPage } from 'next';
import Header from '../components/header';
import NotificationHandler from '../components/notificationHandler';
import { useRequireLogin } from '../hooks/useLoginState';

const IndexPage: NextPage = () => {
  useRequireLogin();

  return (
    <NotificationHandler>
      <>
        <Header />
        <h1 className='w-full py-4 text-center text-2xl font-bold'>登録リスト</h1>
      </>
    </NotificationHandler>
  );
};

export default IndexPage;
