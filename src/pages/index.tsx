import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import NotificationHandler from '../components/notificationHandler';
import { useRequireLogin } from '../hooks/useLoginState';

const IndexPage: NextPage = () => {
  const router = useRouter();
  useRequireLogin();

  const handleLogout = () => {
    destroyCookie(null, 'token');
    router.push('/login');
  };

  return (
    <NotificationHandler>
      <div className='bg-slate-400'>
        Index
        <span className='text-blue-800 underline' onClick={handleLogout}>
          Logout
        </span>
      </div>
    </NotificationHandler>
  );
};

export default IndexPage;
