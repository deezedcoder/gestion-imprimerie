import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import paramsState from '../recoil/atoms/paramsState';
import MuiDrawer from '@mui/material/Drawer';
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { styled } from '@mui/material/styles';
import HeaderLogo from '../components/icons/HeaderLogo';

const data = [
  { icon: <FormatListBulletedIcon />, label: 'Liste des commandes' },
  { icon: <PlaylistAddCheckIcon />, label: 'Selection' },
];

const openedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: '80px',
});

const Drawer = styled(MuiDrawer, {
  shouldForwardComponent: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: '240px',
  flexShrink: 0,
  whiteSpace: 'nowrap',

  '& .MuiDrawer-paper': {
    position: 'relative',
    maxHeight: '100vh',
    overflowX: 'hidden',
    boxShadow: '8px 0 10px -2px rgba(0,0,0,.05)',
  },
  ...(open && {
    ...openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const [selected, SetSelected] = useState(0);
  const { isSidebarOpened } = useRecoilValue(paramsState);

  const handleListItemClick = (index) => {
    SetSelected(index);
  };

  return (
    <Drawer variant="permanent" open={isSidebarOpened}>
      <HeaderLogo fullLength={isSidebarOpened} />
      <Divider />
      <List>
        {data.map((item, index) => (
          <ListItem
            button
            key={item.label}
            sx={{ paddingLeft: '28px', alignItems: 'flex-start' }}
            onClick={() => handleListItemClick(index)}
          >
            <ListItemIcon
              sx={{ minWidth: '38px', color: selected === index && '#d50000' }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={isSidebarOpened ? item.label : ''}
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: 'medium',
                lineHeight: 1.2,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
