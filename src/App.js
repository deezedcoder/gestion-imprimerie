import React from 'react';
import './App.css';
import ImportButton from './components/buttons/ImportButton';
import DBStatusIcon from './components/icons/DBStatusIcon';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isConnected: false };
  }

  render() {
    return (
      <div className="App">
        <ImportButton />
        <DBStatusIcon isConnected={this.isConnected} />
      </div>
    );
  }
}
