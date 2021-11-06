import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import IpcService from '../../services/IpcService';
import appState from '../../recoil/atoms/appState';
import ordersState from '../../recoil/atoms/ordersState';
import ImportButton from '../../components/buttons/ImportButton';
import DBStatusIcon from '../../components/icons/DBStatusIcon';
import { CHANNELS } from '../../shared/constants/channels';
import loadPdfData from '../../utils/loadPdfData';
import OrdersList from '../../components/lists/OrdersList';
import OrderDetails from '../../components/lists/OrderDetails';

export default function Home() {
  const { pdfFilePath } = useRecoilValue(appState);
  const [orders, setOrders] = useRecoilState(ordersState);
  const [isLoading, setIsLoading] = useState(false);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(null);

  const handleOrderSelect = (event, orders) => {
    const index = orders.findIndex((order) => order.id === event.target.id);

    if (index !== -1) setCurrentOrderIndex(index);
  };

  const handleImport = async (pdfFilePath) => {
    setIsLoading(true);
    const order = await loadPdfData(pdfFilePath);
    // TODO validate order (duplicate items, order already exists, etc...)
    // TODO : if valide save order to database
    const dbSaveService = new IpcService(CHANNELS.DATABASE, {
      operation: 'save',
      order,
    });
    dbSaveService
      .send()
      .then(() => {
        const dbReadService = new IpcService(CHANNELS.DATABASE, {
          operation: 'read',
        });
        dbReadService
          .send()
          .then((ipcMainResponse) => {
            setOrders(ipcMainResponse.orders);
          })
          .catch((error) => {
            // TODO handle database read errors
            console.log('readDB', error);
          });
      })
      .catch((error) => {
        // TODO handle database save errors
        console.log('saveDB', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <React.Fragment>
      <DBStatusIcon />
      <ImportButton
        onImport={() => handleImport(pdfFilePath)}
        isLoading={isLoading}
      />
      <OrdersList onSelect={(e) => handleOrderSelect(e, orders)} />
      {currentOrderIndex !== null ? (
        <OrderDetails items={orders[currentOrderIndex].items} />
      ) : (
        ''
      )}
    </React.Fragment>
  );
}
