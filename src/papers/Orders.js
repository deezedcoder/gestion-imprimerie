import { useRecoilValue } from 'recoil';
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
  {
    id: ['amount'],
    label: 'Montant',
    minWidth: 110,
  },
  {
    id: ['status'],
    label: 'Etat',
    minWidth: 150,
  },
];

export default function Orders() {
  const orders = useRecoilValue(ordersState);

  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      <DataGrid
        tableData={orders}
        tableHeader={header}
        keyHeader={header[0].id[0]}
      />
    </Paper>
  );
}
