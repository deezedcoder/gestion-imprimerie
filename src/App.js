import React from 'react';
import './App.css';
import ImportButton from './components/ImportButton';
import OrdersList from './components/OrdersList';
import OrderDetails from './components/OrderDetails';
import { parseImportedData } from './utils/helperFunctions';
import IpcDBService from './IpcDBService';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [], currentOrderIndex: null };
    this.ipcDB = new IpcDBService({ databaseName: 'gesimp' });
    this.handleImport = this.handleImport.bind(this);
    this.handleOrderSelect = this.handleOrderSelect.bind(this);
  }

  componentDidMount() {
    this.ipcDB.connect();
    // TODO handle conncetion errors
  }

  handleImport(data) {
    const order = parseImportedData(data);

    this.setState((state) => ({
      orders: [...state.orders, order],
    }));

    this.ipcDB.save({ collection: 'Orders', data: order });
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
