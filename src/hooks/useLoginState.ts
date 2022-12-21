import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '../states/loginState';

export const useLoginState = () => {
  const currentState = useRecoilValue(loginState);
  const isLoginChecking = currentState === undefined;

  return {
    loginState: currentState,
    isLoginChecking,
  };
};

export const useRequireLogin = () => {
  const { isLoginChecking, loginState } = useLoginState();
  const router = useRouter();

  useEffect(() => {
    if (isLoginChecking) return;
    if (!loginState) router.push('/login');
  }, [isLoginChecking, loginState]);
};

export const useRequireNoLogin = () => {
  const { isLoginChecking, loginState } = useLoginState();
  const router = useRouter();

  useEffect(() => {
    if (isLoginChecking) return;
    if (loginState) router.push('/');
  }, [isLoginChecking, loginState]);
};
