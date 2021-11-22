import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import paramsState from '../recoil/atoms/paramsState';
import componentState from '../recoil/atoms/componentState';
import MuiDrawer from '@mui/material/Drawer';
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HeaderLogo from '../components/icons/HeaderLogo';
import mainContents from '../constants/mainContents';

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
  const [selected, setSelected] = useState(0);
  const setComponent = useSetRecoilState(componentState);
  const { isSidebarOpened } = useRecoilValue(paramsState);

  const handleListItemClick = (index, component) => {
    if (selected !== index) {
      setSelected(index);
      setComponent(component);
    }
  };

  return (
    <Drawer variant="permanent" open={isSidebarOpened}>
      <HeaderLogo fullLength={isSidebarOpened} />
      <Divider />
      <List>
        {mainContents.map((content, index) => (
          <ListItem
            button
            key={content.sidebar.label}
            sx={{
              height: '42px',
              paddingLeft: '28px',
              alignItems: 'flex-start',
            }}
            onClick={() => handleListItemClick(index, content.main.component)}
          >
            <ListItemIcon
              sx={{ minWidth: '38px', color: selected === index && '#d50000' }}
            >
              {content.sidebar.icon}
            </ListItemIcon>
            <ListItemText
              primary={isSidebarOpened ? content.sidebar.label : ''}
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
