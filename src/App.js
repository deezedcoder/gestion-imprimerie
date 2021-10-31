import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Connection from './pages/connection/connection';
import ROUTES from './constants/routes';
import Home from './pages/home/home';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={ROUTES.HOME}>
            <Home />
          </Route>
          <Route path={ROUTES.CONNECTION}>
            <Connection />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
