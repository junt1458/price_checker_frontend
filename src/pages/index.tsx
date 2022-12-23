import { NextPage } from 'next';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import Header from '../components/header';
import NotificationHandler from '../components/notificationHandler';
import { SERVER_URI } from '../constants';
import { useRequireLogin } from '../hooks/useLoginState';
import { RegisteredData } from '../interfaces';

const IndexPage: NextPage = () => {
  useRequireLogin();

  const [isChecking, setChecking] = useState(true);
  const [registeredItems, setRegisteredItems] = useState<RegisteredData[]>([]);

  const updateRegisteredItems = async () => {
    const cookies = parseCookies();

    const req = await fetch(SERVER_URI + '/info', {
      headers: {
        Authorization: 'Bearer ' + cookies.token,
      },
    });

    const res = await req.json();
    setRegisteredItems(res.items == null ? [] : res.items);
    setChecking(false);
  };

  useEffect(() => {
    updateRegisteredItems();
  }, []);

  const handleUnRegister = async (jan: string) => {
    const cookies = parseCookies();

    const body: Record<string, string | number> = {
      item_code: jan,
    };

    const req = await fetch(SERVER_URI + '/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies.token,
      },
      body: JSON.stringify(body),
    });

    const res = await req.json();
    if (!res.status) {
      alert('エラーが発生しました。');
      return;
    }

    updateRegisteredItems();
  };

  return (
    <NotificationHandler>
      <>
        <Header />
        <h1 className='w-full py-4 text-center text-2xl font-bold'>登録リスト</h1>
        <div className='px-4'>
          <div className='mx-auto mt-9 mb-4 max-w-[1000px] rounded-lg border border-gray-600'>
            {registeredItems.map((v, i) => (
              <div
                key={'item_' + i}
                className='flex flex-wrap items-center border-gray-500 px-2 py-1 [&:nth-child(n+2)]:border-t'
              >
                <div className='m-2 h-36 w-36 min-w-[144px]'>
                  <img src={v.image} alt='Item Image' />
                </div>
                <div className='m-2 flex-1'>
                  <h2>{v.name.replaceAll('&amp;', '&')}</h2>
                  <br />
                  <h3>
                    値段:{' '}
                    <span className='text-2xl text-red-600 underline'>
                      {v.price.toLocaleString()}円
                    </span>
                  </h3>
                  <h3>通知設定価格: {v.border_price.toLocaleString()}円</h3>
                  <h4>送料区分: {v.shipping}</h4>
                  <br />
                  <h5>販売者: {v.seller.replaceAll('&amp;', '&')}</h5>
                </div>
                <div className='m-2 block min-w-[160px]'>
                  <Link href={v.url} target='_blank' rel='noopener noreferrer'>
                    <button className='my-2 block w-full rounded-lg bg-green-600 py-1 text-white'>
                      サイトで見る
                    </button>
                  </Link>
                  <button
                    className={'my-2 block w-full rounded-lg bg-red-600 py-1 text-white'}
                    onClick={() => handleUnRegister(v.item_code)}
                  >
                    登録解除
                  </button>
                </div>
              </div>
            ))}
            {isChecking ? (
              <div className='py-4 px-6 text-center'>
                <span className='font-bold'>読み込み中...</span>
              </div>
            ) : (
              <></>
            )}
            {registeredItems.length > 0 || isChecking ? (
              <></>
            ) : (
              <div className='py-4 px-6 text-center'>
                <span className='font-bold'>通知対象が登録されていません。</span>
                <br />
                <Link href='/search' className='mt-2 block text-blue-700 underline'>
                  商品検索ページへ移動する
                </Link>
              </div>
            )}
          </div>
        </div>
      </>
    </NotificationHandler>
  );
};

export default IndexPage;
