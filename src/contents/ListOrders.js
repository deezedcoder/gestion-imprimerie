import { useRecoilValue } from 'recoil';
import itemsState from '../recoil/atoms/itemsState';
import Orders from '../papers/Orders';
import Items from '../papers/Items';
import { Box } from '@mui/material';

const ListOrders = () => {
  const items = useRecoilValue(itemsState);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
      }}
    >
      <Orders />
      <Items items={items} />
    </Box>
  );
};

export default ListOrders;
