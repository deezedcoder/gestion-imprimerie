// TODO Extract this logic into a pages using Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Connection from './pages/connection/connection';
import Home from './pages/home/home';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Connection />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
