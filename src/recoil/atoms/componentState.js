import { atom } from 'recoil';
import { ListOrders as DefaultComponent } from '../../contents';

const componentState = atom({
  key: 'componentState',
  default: <DefaultComponent />,
});

export default componentState;
