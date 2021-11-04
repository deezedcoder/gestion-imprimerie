import { atom } from 'recoil';

const ordersState = atom({
  key: 'ordersState',
  default: [],
});

export default ordersState;
