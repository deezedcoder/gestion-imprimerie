import React from 'react';
import ImportButton from '../../components/buttons/ImportButton';
import DBStatusIcon from '../../components/icons/DBStatusIcon';

export default function Home() {
  const dbStatus = null;

  return (
    <React.Fragment>
      <DBStatusIcon initStatus={dbStatus} />
      <ImportButton />
    </React.Fragment>
  );
}
