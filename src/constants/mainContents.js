import { ListOrders, SelectOrders } from '../contents/index';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const mainContents = [
  {
    sidebar: {
      icon: <FormatListBulletedIcon />,
      label: 'Liste des commandes',
    },
    main: {
      component: <ListOrders />,
    },
  },
  {
    sidebar: {
      icon: <PlaylistAddCheckIcon />,
      label: 'Selection',
    },
    main: {
      component: <SelectOrders />,
    },
  },
];

export default mainContents;
