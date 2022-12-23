import { NextPage } from 'next';
import Header from '../components/header';
import NotificationHandler from '../components/notificationHandler';
import { useRequireLogin } from '../hooks/useLoginState';

const SearchPage: NextPage = () => {
  useRequireLogin();

  return (
    <NotificationHandler>
      <>
        <Header />
        <div className='bg-slate-400'>Search</div>
      </>
    </NotificationHandler>
  );
};

export default SearchPage;
