import { atom } from 'recoil';

const appState = atom({
  key: 'appState',
  default: {},
});

export default appState;
