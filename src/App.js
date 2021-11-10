import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import appState from './recoil/atoms/appState';
import AppInit from './pages/appinit/AppInit';
import Home from './pages/home/Home';
import ROUTES from './constants/routes';
import { Box, CssBaseline } from '@mui/material';
import useSubscriber from './components/hooks/useSubscriber';

export default function App() {
  const setAppParams = useSetRecoilState(appState);
  const newParams = useSubscriber();

  useEffect(() => {
    setAppParams((prevParams) => {
      return { ...prevParams, ...newParams };
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
