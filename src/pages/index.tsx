import { NextPage } from 'next';
import Test from '../components/test';
import { useRequireLogin } from '../hooks/useLoginState';

const IndexPage: NextPage = () => {
  useRequireLogin();

  return (
    <div className='bg-slate-400'>
      Index, <Test />
    </div>
  );
};

export default IndexPage;
