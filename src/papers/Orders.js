import { useRecoilValue, useRecoilState } from 'recoil';
import selectedOrdersState from '../recoil/atoms/selectedOrdersState';
import ordersState from '../recoil/atoms/ordersState';
import DataGrid from '../components/lists/DataGrid';
import Paper from '@mui/material/Paper';

const header = [
  { id: ['id'], label: 'N°', minWidth: 60, key: true },
  { id: ['date'], label: 'Date', minWidth: 95 },
  {
    id: ['customer', 'id'], // use array for nested objects
    label: 'Client',
    minWidth: 90,
  },
  {
    id: ['customer', 'name'],
    label: 'Nom',
    minWidth: 200,
  },
];

export default function Orders() {
  const orders = useRecoilValue(ordersState);
  const [selectedOrders, setSelectedOrders] =
    useRecoilState(selectedOrdersState);

  return (
    <Paper elevation={6} sx={{ overflow: 'hidden' }}>
      <DataGrid
        tableData={orders}
        tableHeader={header}
        keyHeader={header[0].id[0]}
        // handleRowClick={(selectedOrderId) => handleSelection(selectedOrderId)}
        selectedRows={selectedOrders}
        allowMultipleSelection={true}
        onSelectedChange={(selected) => setSelectedOrders(selected)}
      />
    </Paper>
  );
}
