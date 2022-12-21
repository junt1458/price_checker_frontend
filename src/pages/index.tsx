import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import Test from '../components/test';
import { useRequireLogin } from '../hooks/useLoginState';

const IndexPage: NextPage = () => {
  const router = useRouter();
  useRequireLogin();

  const handleLogout = () => {
    destroyCookie(null, 'token');
    router.push('/login');
  };

  return (
    <div className='bg-slate-400'>
      Index, <Test />
      <span className='text-blue-800 underline' onClick={handleLogout}>
        Logout
      </span>
    </div>
  );
};

export default IndexPage;
