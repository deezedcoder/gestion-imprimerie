import { atom } from 'recoil';

const componentState = atom({
  key: 'componentState',
  default: 'ListOrders',
});

export default componentState;
