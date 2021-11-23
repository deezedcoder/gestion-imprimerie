import { useState } from 'react';
import db from '../../db';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import settingsState from '../../recoil/atoms/settingsState';
import paramsState from '../../recoil/atoms/paramsState';
import loadPdfData from '../../utils/loadPdfData';
import ImportButton from '../buttons/ImportButton';

const PdfLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { pdfFilePath } = useRecoilValue(settingsState);
  const setParams = useSetRecoilState(paramsState);

  const handleImport = async (pdfFilePath) => {
    setIsLoading(true);
    setParams((prevParams) => ({ ...prevParams, openBackdrop: true }));

    const orders = await loadPdfData(pdfFilePath);
    // TODO validate order (duplicate items, order already exists, etc...)
    // TODO : if valide save order to database
    db.transaction('rw', db.orders, db.items, async () => {
      // Handle transactions
      console.log(db.orders);
    })
      .catch((err) => {
        // TODO Handle transaction failed
        console.error(err.stack);
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
