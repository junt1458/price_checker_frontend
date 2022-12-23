import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { useState } from 'react';

const Header: React.FunctionComponent = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const links = [
    {
      path: '/',
      label: '登録リスト',
    },
    {
      path: '/search',
      label: '検索',
    },
  ];

  const handleLogout = () => {
    if (confirm('ログアウトしますか？')) {
      destroyCookie(null, 'token');
      router.push('/login');
    }
  };

  return (
    <>
      <div className='flex h-[55px] w-screen items-center justify-between bg-slate-300 px-3 md:justify-start'>
        <div className='flex items-center'>
          <Image src='/static/Icon.svg' width='32' height='32' alt='logo' />
          <span className='px-3 text-lg font-bold'>Rahoo!</span>
        </div>
        <button className='inline md:hidden' type='button' onClick={() => setOpen((o) => !o)}>
          <div className='flex h-9 w-9 items-center justify-center rounded-md border border-gray-600 text-xl'>
            <i className='fa-solid fa-bars' />
          </div>
        </button>
        <div className='hidden flex-1 items-center justify-between md:flex'>
          {links.map((v) => (
            <Link
              className={'mx-3' + (router.pathname == v.path ? ' font-bold' : '')}
              href={v.path}
              key={v.path}
            >
              {v.label}
            </Link>
          ))}
          <div className='flex flex-1 justify-end'>
            <button
              type='button'
              className='rounded-md bg-red-600 px-2 py-1 text-white'
              onClick={() => handleLogout()}
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
      <div className={'w-screen bg-slate-300' + (open ? ' block' : ' hidden')}>
        {links.map((v) => (
          <Link
            className={router.pathname == v.path ? ' font-bold' : ''}
            href={v.path}
            key={v.path}
          >
            <div className='mx-3 border-b-[1px] border-gray-600 py-2 px-1 text-xl'>{v.label}</div>
          </Link>
        ))}
        <button type='button' onClick={() => handleLogout()}>
          <div className='mx-3 mb-3 border-gray-600 py-2 px-1 text-xl'>ログアウト</div>
        </button>
      </div>
    </>
  );
};
export default Header;
