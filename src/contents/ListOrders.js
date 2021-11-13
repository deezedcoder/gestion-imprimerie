import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Container } from '@mui/material';
import ordersState from '../recoil/atoms/ordersState';
import OrdersList from '../components/lists/OrdersList';
import OrderDetails from '../components/lists/OrderDetails';

const ListOrders = () => {
  const orders = useRecoilValue(ordersState);

  const [currentOrderIndex, setCurrentOrderIndex] = useState(null);

  const handleOrderSelect = (event, orders) => {
    const index = orders.findIndex((order) => order.id === event.target.id);

    if (index !== -1) setCurrentOrderIndex(index);
  };

  return (
    <Box
      component="main"
      sx={{
        // border: '2px solid lime',
        flexGrow: 1,
        overflow: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <OrdersList onSelect={(e) => handleOrderSelect(e, orders)} />
        {currentOrderIndex !== null ? (
          <OrderDetails items={orders[currentOrderIndex].items} />
        ) : (
          ''
        )}
      </Container>
    </Box>
  );
};

export default ListOrders;
