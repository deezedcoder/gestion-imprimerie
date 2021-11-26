import { Suspense } from 'react';
import Orders from '../papers/Orders';
import Items from '../papers/Items';
import { Box } from '@mui/material';

const ListOrders = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
      }}
    >
      <Orders />
      <Suspense fallback={<div>Chargement...</div>}>
        <Items />
      </Suspense>
    </Box>
  );
};

export default ListOrders;
