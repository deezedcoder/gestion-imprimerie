import { atom } from 'recoil';

const selectedOrdersState = atom({
  key: 'selectedOrdersState',
  default: [],
});

export default selectedOrdersState;
