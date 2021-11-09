import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import appState from './recoil/atoms/appState';
import { useState, useEffect } from 'react';
import AppInit from './pages/appinit/AppInit';
import Home from './pages/home/Home';
import ROUTES from './constants/routes';
import { CHANNELS } from './shared/constants/channels';
import { Box, CssBaseline } from '@mui/material';

import './App.css';

export default function App() {
  const [dbStatus, setDbStatus] = useState();
  const setAppParams = useSetRecoilState(appState);

  useEffect(() => {
    window.api.ipcRendererOn(CHANNELS.DB_CONNECT_STATUS, setDbStatus);

    return () => {
      window.api.ipcRendererRemoveListener(
        CHANNELS.DB_CONNECT_STATUS,
        setDbStatus
      );
    };
  }, []);

  useEffect(() => {
    setAppParams((prevParams) => {
      return { ...prevParams, dbStatus };
    });
  });

  return (
    <Box>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path={ROUTES.HOME}>
            <Home />
          </Route>
          <Route path={ROUTES.APPINIT}>
            <AppInit />
          </Route>
        </Switch>
      </Router>
    </Box>
  );
}
