import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Box } from '@mui/material';
import ordersState from '../recoil/atoms/ordersState';
import OrdersList from '../components/lists/OrdersList';
import OrderDetails from '../components/lists/OrderDetails';
import Orders from '../papers/Orders';

const ListOrders = () => {
  const orders = useRecoilValue(ordersState);

  const [currentOrderIndex, setCurrentOrderIndex] = useState(null);

  const handleOrderSelect = (event, orders) => {
    const index = orders.findIndex((order) => order.id === event.target.id);

    if (index !== -1) setCurrentOrderIndex(index);
  };

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Orders />
    </Box>
  );
};

export default ListOrders;

{
  /* <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <OrdersList onSelect={(e) => handleOrderSelect(e, orders)} />
      {currentOrderIndex !== null ? (
        <OrderDetails items={orders[currentOrderIndex].items} />
      ) : (
        ''
      )}
    </Container> */
}
