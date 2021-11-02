import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppInit from './pages/appinit/AppInit';
import Home from './pages/home/Home';
import ROUTES from './constants/routes';
import './App.css';

export default function App() {
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
