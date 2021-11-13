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
import People from '@mui/icons-material/People';
import { styled } from '@mui/material/styles';
import HeaderLogo from '../components/icons/HeaderLogo';

const data = [{ icon: <People />, label: 'Liste des commandes' }];

const openedMixin = (theme) => ({
  // width: drawerWidth,
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
  // border: '1px solid pink',
  width: '240px',
  flexShrink: 0,
  whiteSpace: 'nowrap',

  '& .MuiDrawer-paper': {
    position: 'relative',
    maxHeight: '100vh',
    overflowX: 'hidden',
    boxShadow: '8px 0 10px -2px rgba(0,0,0,.05)',
    // border: '1px solid yellow',
  },
  ...(open && {
    ...openedMixin(theme),
    // '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    // '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const { isSidebarOpened } = useRecoilValue(paramsState);

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
          >
            <ListItemIcon sx={{ minWidth: '38px' }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={isSidebarOpened ? item.label : ''}
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: 'medium',
                lineHeight: 1.4,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
