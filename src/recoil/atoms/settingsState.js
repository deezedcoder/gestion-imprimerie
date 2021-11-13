import { atom } from 'recoil';

const settingsState = atom({
  key: 'settingsState',
  default: {},
});

export default settingsState;
