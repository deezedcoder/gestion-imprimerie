import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import paramsState from './recoil/atoms/paramsState';
import AppInit from './pages/appinit/AppInit';
import Home from './pages/home/Home';
import ROUTES from './constants/routes';
import { Box, CssBaseline } from '@mui/material';
import useSubscriber from './hooks/useSubscriber';

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const setParams = useSetRecoilState(paramsState);
  const subscriptions = useSubscriber();

  useEffect(() => {
    if (isAppReady) {
      setParams((prevParams) => {
        return { ...prevParams, ...subscriptions };
      });
    }
  });

  return (
    <Box>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path={ROUTES.HOME}>
            {isAppReady ? (
              <Home />
            ) : (
              <AppInit onInit={() => setIsAppReady(true)} />
            )}
          </Route>
        </Switch>
      </Router>
    </Box>
  );
}
