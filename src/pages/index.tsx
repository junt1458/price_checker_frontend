import { NextPage } from 'next';
import Test from '../components/test';

const IndexPage: NextPage = () => {
  return (
    <div className="bg-slate-400">
      Index, <Test />
    </div>
  );
};

export default IndexPage;
