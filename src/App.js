import React from 'react';
import ImportButton from './components/buttons/ImportButton';
import OrdersList from './components/lists/OrdersList';
import OrderDetails from './components/lists/OrderDetails';
import { parseImportedData } from './utils/helperFunctions';
import './App.css';
import DBStatusIcon from './components/icons/DBStatusIcon';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isConnected: false, orders: [], currentOrderIndex: null };
    this.handleImport = this.handleImport.bind(this);
    this.handleOrderSelect = this.handleOrderSelect.bind(this);
  }

  handleImport(data) {
    const order = parseImportedData(data);

    this.setState((state) => ({
      orders: [...state.orders, order],
    }));
  }

  handleOrderSelect(event) {
    const currentOrderIndex = this.state.orders.findIndex(
      (order) => order.id === event.target.id
    );

    if (currentOrderIndex !== -1) this.setState({ currentOrderIndex });
  }

  render() {
    return (
      <div className="App">
        <DBStatusIcon isConnected={this.isConnected} />
        <ImportButton src="commande/bsm.pdf" onImport={this.handleImport} />
        <OrdersList
          orders={this.state.orders}
          onSelect={this.handleOrderSelect}
        />
        {this.state.currentOrderIndex !== null ? (
          <OrderDetails
            order={this.state.orders[this.state.currentOrderIndex]}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}
