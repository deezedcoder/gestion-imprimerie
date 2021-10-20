import React from 'react';
import './App.css';
import ImportButton from './components/ImportButton';
import OrdersList from './components/OrdersList';
import OrderDetails from './components/OrderDetails';
import { parseImportedData } from './utils/helperFunctions';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleImport = this.handleImport.bind(this);
    this.handleOrderSelect = this.handleOrderSelect.bind(this);
    this.state = { orders: [], currentOrderIndex: null };
  }

  handleImport(data) {
    this.setState((state) => ({
      orders: [...state.orders, parseImportedData(data)],
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
        <ImportButton src="data/bsm.pdf" onImport={this.handleImport} />
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
