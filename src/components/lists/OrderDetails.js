import './OrderDetails.css';

const OrderDetails = (props) => {
  return (
    <ul id="order-details">
      {props.items.map((item) => (
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
