import { NextPage } from 'next';
import Link from 'next/link';

const Page404: NextPage = () => {
  return (
    <div className='flex h-screen w-screen justify-center'>
      <div className='block py-4 text-center'>
        <h1 className='my-2 text-4xl'>Error 404</h1>
        <p className='my-3'>指定されたページは見つかりませんでした。</p>
        <Link className='rounded-md bg-blue-500 py-1 px-2 text-white' href='/'>
          トップへ戻る
        </Link>
      </div>
    </div>
  );
};

export default Page404;
