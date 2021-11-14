import { Box } from '@mui/material';
import Orders from '../papers/Orders';
import Items from '../papers/Items';

const ListOrders = () => {
  /* const [currentOrderIndex, setCurrentOrderIndex] = useState(null);

  const handleOrderSelect = (event, orders) => {
    const index = orders.findIndex((order) => order.id === event.target.id);

    if (index !== -1) setCurrentOrderIndex(index);
   };
  */
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Orders />
      <Items />
    </Box>
  );
};

export default ListOrders;
