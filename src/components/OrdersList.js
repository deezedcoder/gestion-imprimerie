import './OrdersList.css';

const OrdersList = (props) => {
  return (
    <ul id="orders-list" onClick={props.onSelect}>
      {props.orders.map((order) => (
        <li key={order.id} id={order.id}>
          {order.id} | {order.date} | {order.customer.id} |{' '}
          {order.customer.name}
        </li>
      ))}
    </ul>
  );
};

export default OrdersList;
