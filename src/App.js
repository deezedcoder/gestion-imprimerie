import React from 'react';
import './App.css';
import DBStatusIcon from './components/icons/DBStatusIcon';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isConnected: false };
  }

  render() {
    return (
      <div className="App">
        <DBStatusIcon isConnected={this.isConnected} />
      </div>
    );
  }
}
