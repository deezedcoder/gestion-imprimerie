import './OrderDetails.css';

const OrderDetails = (props) => {
  console.log(props.order);
  return (
    <ul id="order-details">
      {props.order.items.map((item) => (
        <li key={item.reference}>
          <div>{item.reference}</div>
          <div>{item.quantity}</div>
          <div>{item.comment}</div>
          <div>{item.price}</div>
        </li>
      ))}
    </ul>
  );
};

export default OrderDetails;
