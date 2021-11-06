import { useRecoilValue } from 'recoil';
import ordersState from '../../recoil/atoms/ordersState';
import './OrdersList.css';

const OrdersList = (props) => {
  const orders = useRecoilValue(ordersState);

  return (
    <ul id="orders-list" onClick={props.onSelect}>
      {orders.map((order) => (
        <li key={order.id} id={order.id}>
          {order.id} | {order.date} | {order.customer.id} |{' '}
          {order.customer.name}
        </li>
      ))}
    </ul>
  );
};

export default OrdersList;
