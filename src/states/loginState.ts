import { atom } from 'recoil';

export const loginState = atom<undefined | boolean>({
  key: 'LoginState',
  default: undefined,
});
