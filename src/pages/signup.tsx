import Image from 'next/image';
import { NextPage } from 'next';
import { useRequireNoLogin } from '../hooks/useLoginState';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';
import { SERVER_URI } from '../constants';

const SignupPage: NextPage = () => {
  const router = useRouter();
  const [isLoggingIn, setLoggingIn] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [passError2, setPassError2] = useState('');
  const [signupError, setSignupError] = useState('');

  useRequireNoLogin();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text == '') {
      setEmailError('入力されていません。');
      return;
    }

    if (!text.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
      setEmailError('メールアドレスの形式ではありません。');
      return;
    }

    setEmailError('');
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text == '') {
      setPassError('入力されていません。');
      return;
    }

    setPassError('');
  };

  const handleChangePassword2 = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text == '') {
      setPassError2('入力されていません。');
      return;
    }

    if (text != (document.getElementById('pass') as HTMLInputElement).value) {
      setPassError2('入力値が一致しません。');
      return;
    }

    setPassError2('');
  };

  const handleSignup = () => {
    setSignupError('');

    const id = (document.getElementById('user') as HTMLInputElement).value;
    const pass = (document.getElementById('pass') as HTMLInputElement).value;
    if (
      id == '' ||
      !id.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/) ||
      pass == ''
    ) {
      setSignupError('未入力の項目があります。');
      return;
    }

    if (pass != (document.getElementById('pass2') as HTMLInputElement).value) {
      setSignupError('パスワードが一致しません。');
      return;
    }

    setLoggingIn(true);

    fetch(SERVER_URI + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: id,
        pass: pass,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.status) {
          // 同じ情報でログイン処理をする。
          fetch(SERVER_URI + '/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              address: id,
              pass: pass,
            }),
          })
            .then((r) => r.json())
            .then((r) => {
              setLoggingIn(false);
              if (r.status && r.token != null) {
                setCookie(null, 'token', r.token);
                router.push('/');
              } else {
                setSignupError('登録に失敗しました。');
              }
            });
        } else {
          setSignupError('登録に失敗しました。');
          setLoggingIn(false);
        }
      });
  };

  return (
    <div className='w-screen'>
      <div className='mt-5 flex justify-center py-3'>
        <div className='justfy-center flex items-center'>
          <Image src='/static/Icon.svg' width={64} height={64} alt='Logo' />
          <span className='px-4 text-2xl font-bold'>Price Checker</span>
        </div>
      </div>
      <span className='my-5 block text-center text-xl font-bold'>新規登録</span>
      <div className='mx-auto w-[95%] max-w-[600px] rounded-md border-2 border-gray-500 p-5'>
        <div className='flex'>
          <i className='fa-regular fa-envelope w-[38px] rounded-l border border-gray-700 bg-slate-200 px-2 py-1 text-center text-xl' />
          <div className='block flex-1 overflow-hidden rounded-r border-r border-t border-b border-gray-700 bg-cyan-100'>
            <input
              id='user'
              type='email'
              className='h-full w-full px-2'
              placeholder='メールアドレス'
              onChange={handleChangeEmail}
            ></input>
          </div>
        </div>
        <div className='pl-[38px] text-red-600'>{emailError}</div>

        <div className='mt-4 flex'>
          <i className='fa fa-lock w-[38px] rounded-l border border-gray-700 bg-slate-200 px-2 py-1 text-center text-xl' />
          <div className='block flex-1 overflow-hidden rounded-r border-r border-t border-b border-gray-700 bg-cyan-100'>
            <input
              id='pass'
              type='password'
              className='h-full w-full px-2'
              placeholder='パスワード'
              onChange={handleChangePassword}
            ></input>
          </div>
        </div>
        <div className='mb-4 pl-[38px] text-red-600'>{passError}</div>

        <div className='mt-4 flex'>
          <i className='fa fa-lock w-[38px] rounded-l border border-gray-700 bg-slate-200 px-2 py-1 text-center text-xl' />
          <div className='block flex-1 overflow-hidden rounded-r border-r border-t border-b border-gray-700 bg-cyan-100'>
            <input
              id='pass2'
              type='password'
              className='h-full w-full px-2'
              placeholder='パスワード(確認)'
              onChange={handleChangePassword2}
            ></input>
          </div>
        </div>
        <div className='mb-4 pl-[38px] text-red-600'>{passError2}</div>

        <span className='block text-center font-bold text-blue-600 underline hover:text-blue-700'>
          <Link href='/login'>すでにアカウントをお持ちの場合はこちら</Link>
        </span>

        <div className='mt-4 w-full text-center'>
          <button
            type='button'
            className='rounded-md bg-blue-500 px-8 py-2 text-white'
            disabled={isLoggingIn}
            onClick={handleSignup}
          >
            {isLoggingIn ? '登録中...' : '新規登録'}
          </button>
          <div className=' mt-4 text-red-600'>{signupError}</div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
