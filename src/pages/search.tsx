import { NextPage } from 'next';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import Header from '../components/header';
import NotificationHandler from '../components/notificationHandler';
import { SERVER_URI } from '../constants';
import { useRequireLogin } from '../hooks/useLoginState';

interface SearchData {
  image: string;
  janCode: string;
  name: string;
  price: number;
  seller: string;
  shipping: string;
  url: string;
}

interface RegisteredData {
  image: string;
  item_code: string;
  name: string;
  price: number;
  seller: string;
  shipping: string;
  url: string;
  border_price: number;
}

const SearchPage: NextPage = () => {
  useRequireLogin();

  const [registeredJans, setRegisteredJans] = useState<string[]>([]);
  const [itemData, setItemData] = useState<SearchData[]>([]);
  const [, setSearching] = useState(false);
  const [statusMessage, setStatusMessage] = useState('検索ワードを入力してください。');
  const [isError, setIsError] = useState(false);

  const updateRegisteredJans = async () => {
    const cookies = parseCookies();

    const req = await fetch(SERVER_URI + '/info', {
      headers: {
        Authorization: 'Bearer ' + cookies.token,
      },
    });

    const res = await req.json();
    const items: RegisteredData[] = res.items == null ? [] : res.items;
    setRegisteredJans(items.map((v) => v.item_code));
  };

  useEffect(() => {
    updateRegisteredJans();
  }, []);

  const handleRegister = async (jan: string) => {
    const cookies = parseCookies();

    const registeredJans = await new Promise<string[]>((resolve) => {
      setRegisteredJans((rj) => {
        resolve(rj);
        return rj;
      });
    });

    let endpoint = '';
    const body: Record<string, string | number> = {
      item_code: jan,
    };

    if (!registeredJans.includes(jan)) {
      const input = prompt('通知を送信する価格を入力してください。（単位: 円）');
      if (input == null || input == '') return;

      const val = Number(input);
      if (isNaN(val)) {
        alert('数字以外が入力されました。');
        return;
      }

      body['border_price'] = val;
      endpoint = '/add';
    } else {
      endpoint = '/remove';
    }

    const req = await fetch(SERVER_URI + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies.token,
      },
      body: JSON.stringify(body),
    });

    const res = await req.json();
    if (!res.status) {
      alert('登録中にエラーが発生しました。');
      return;
    }

    updateRegisteredJans();
  };

  const handleSearch = async () => {
    const cur = await new Promise<boolean>((resolve) => {
      setSearching((v) => {
        resolve(v);
        return v;
      });
    });

    if (cur) return;

    const name = (document.getElementById('name') as HTMLInputElement).value;
    if (name == '') {
      setStatusMessage('検索ワードが入力されていません。');
      setIsError(true);
      return;
    }

    setSearching(true);
    setStatusMessage('検索中です...');
    setIsError(false);

    const cookies = parseCookies();

    const req = await fetch(SERVER_URI + '/search?q=' + encodeURIComponent(name), {
      headers: {
        Authorization: 'Bearer ' + cookies.token,
      },
    });

    const res = await req.json();
    setSearching(false);
    if (!res.status) {
      setStatusMessage('検索に失敗しました。');
      setIsError(true);
      return;
    }

    setItemData(res.items == null ? [] : res.items);
    setStatusMessage(res.items.length + '件の商品が見つかりました。');
    setIsError(false);

    console.log(res.items);
  };

  return (
    <NotificationHandler>
      <>
        <Header />
        <h1 className='w-full py-4 text-center text-2xl font-bold'>商品検索</h1>
        <div className='flex justify-center py-3'>
          <div className='flex w-full max-w-[500px] px-4'>
            <div className='block flex-1 overflow-hidden rounded-l border-l border-t border-b border-gray-700 bg-cyan-100'>
              <input
                id='name'
                type='text'
                className='h-full w-full px-2'
                placeholder='キーワード'
              ></input>
            </div>
            <button type='button' onClick={() => handleSearch()}>
              <i className='fa-solid fa-magnifying-glass w-[38px] rounded-r border border-gray-700 bg-slate-200 px-2 py-1 text-center text-xl' />
            </button>
          </div>
        </div>
        <span
          className={
            'block w-full text-center text-lg ' + (isError ? ' font-bold text-red-500' : '')
          }
        >
          {statusMessage}
        </span>
        <div
          className={
            'mx-auto mt-9 mb-4 max-w-[1000px] rounded-lg border border-gray-600' +
            (itemData.length ? '' : ' hidden')
          }
        >
          {itemData.map((v, i) => (
            <div
              key={'item_' + i}
              className='flex flex-wrap border-gray-500 px-2 py-1 [&:nth-child(n+2)]:border-t'
            >
              <div className='m-2 h-36 w-36 min-w-[144px]'>
                <img src={v.image} alt='Item Image' />
              </div>
              <div className='m-2 flex-1'>
                {v.name.replaceAll('&amp;', '&')}
                {v.price}
                {v.seller.replaceAll('&amp;', '&')}
                {v.shipping}
              </div>
              <div className='m-2 block h-40 min-w-[160px]'>
                <Link href={v.url} target='_blank' rel='noopener noreferrer'>
                  <button className='my-2 block w-full rounded-lg bg-green-600 py-1 text-white'>
                    サイトで見る
                  </button>
                </Link>
                <button
                  className={
                    'my-2 block w-full rounded-lg py-1 text-white ' +
                    (registeredJans.includes(v.janCode) ? 'bg-red-600' : 'bg-blue-600')
                  }
                  onClick={() => handleRegister(v.janCode)}
                >
                  {registeredJans.includes(v.janCode) ? '登録解除' : '登録'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    </NotificationHandler>
  );
};

export default SearchPage;
