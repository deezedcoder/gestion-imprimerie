import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ordersState from '../../recoil/atoms/ordersState';
import settingsState from '../../recoil/atoms/settingsState';
import paramsState from '../../recoil/atoms/paramsState';
import IpcService from '../../services/IpcService';
import loadPdfData from '../../utils/loadPdfData';
import ImportButton from '../buttons/ImportButton';
import { CHANNELS } from '../../shared/constants/channels';

const PdfLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { pdfFilePath } = useRecoilValue(settingsState);
  const setOrders = useSetRecoilState(ordersState);
  const setParams = useSetRecoilState(paramsState);

  const handleImport = async (pdfFilePath) => {
    setIsLoading(true);
    setParams((prevParams) => ({ ...prevParams, openBackdrop: true }));

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
        setParams((prevParams) => ({ ...prevParams, openBackdrop: false }));
      });
  };

  return (
    <ImportButton
      onImport={() => handleImport(pdfFilePath)}
      isLoading={isLoading}
    />
  );
};

export default PdfLoader;
