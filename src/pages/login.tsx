import { NextPage } from 'next';
import { useRequireNoLogin } from '../hooks/useLoginState';

const IndexPage: NextPage = () => {
  useRequireNoLogin();

  return <div className='bg-slate-400'>Login Page</div>;
};

export default IndexPage;
