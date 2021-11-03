import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import appState from './recoil/atoms/appState';
import { useState, useEffect } from 'react';
import AppInit from './pages/appinit/AppInit';
import Home from './pages/home/Home';
import ROUTES from './constants/routes';
import { CHANNELS } from './shared/constants/channels';
import './App.css';

export default function App() {
  const [param, setParam] = useState();
  const setAppParams = useSetRecoilState(appState);

  useEffect(() => {
    window.api.ipcRendererOn(CHANNELS.DB_CONNECT_STATUS, setParam);

    return () => {
      window.api.ipcRendererRemoveListener(
        CHANNELS.DB_CONNECT_STATUS,
        setParam
      );
    };
  }, []);

  useEffect(() => {
    setAppParams((prevParams) => {
      return { ...prevParams, dbStatus: param };
    });
  });

  return (
    <div className="App">
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
    </div>
  );
}
