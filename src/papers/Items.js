import { useRecoilValue } from 'recoil';
import itemsState from '../recoil/atoms/itemsState';
import DataGrid from '../components/lists/DataGrid';
import { Paper } from '@mui/material';

const header = [
  { id: ['reference'], label: 'Réf.', minWidth: 60 },
  { id: ['quantity'], label: 'Qte', minWidth: 95 },
  {
    id: ['comment'],
    label: 'Commentaire',
    minWidth: 200,
  },
  {
    id: ['price'],
    label: 'p.u TTC',
    minWidth: 110,
  },
];

export default function Items() {
  const items = useRecoilValue(itemsState);

  return (
    <Paper variant="outlined">
      <DataGrid
        tableData={items}
        tableHeader={header}
        keyHeader={header[0].id[0]}
      />
    </Paper>
  );
}
