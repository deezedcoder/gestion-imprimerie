import React from 'react';
import { useRecoilValue } from 'recoil';
import appState from '../../recoil/atoms/appState';
import ImportButton from '../../components/buttons/ImportButton';
import DBStatusIcon from '../../components/icons/DBStatusIcon';
import loadPdfData from '../../utils/loadPdfData';

export default function Home() {
  const { pdfFilePath } = useRecoilValue(appState);

  const handleImport = async () => {
    const order = await loadPdfData(pdfFilePath);
    console.log(order);
    // TODO : save order to database
    // TODO : read orders from database
    // TODO : update recoil orders with setOrders
  };

  return (
    <React.Fragment>
      <DBStatusIcon />
      <ImportButton onImport={handleImport} />
    </React.Fragment>
  );
}
