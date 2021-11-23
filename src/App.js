import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppInit from './pages/appinit/AppInit';
import Home from './pages/home/Home';
import ROUTES from './constants/routes';
import { Box, CssBaseline } from '@mui/material';

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

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
