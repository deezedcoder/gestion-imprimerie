import { useRecoilState } from 'recoil';
import selectedOrdersState from '../recoil/atoms/selectedOrdersState';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
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
  const orders = useLiveQuery(() => db.orders.toArray());

  const [selectedOrders, setSelectedOrders] =
    useRecoilState(selectedOrdersState);

  if (!orders) return null;

  return (
    <Paper variant="outlined">
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
