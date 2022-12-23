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
        <div className='bg-slate-400'>Index</div>
      </>
    </NotificationHandler>
  );
};

export default IndexPage;
