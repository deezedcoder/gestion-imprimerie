import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import paramsState from './recoil/atoms/paramsState';
import AppInit from './pages/appinit/AppInit';
import Home from './pages/home/Home';
import ROUTES from './constants/routes';
import { Box, CssBaseline } from '@mui/material';
import useSubscriber from './hooks/useSubscriber';

export default function App() {
  const setParams = useSetRecoilState(paramsState);
  const newParams = useSubscriber();

  useEffect(() => {
    setParams((prevParams) => {
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
