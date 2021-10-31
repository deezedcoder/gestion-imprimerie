import React from 'react';
import ImportButton from '../../components/buttons/ImportButton';
import DBStatusIcon from '../../components/icons/DBStatusIcon';

export default function Home() {
  return (
    <React.Fragment>
      <DBStatusIcon />
      <ImportButton />
    </React.Fragment>
  );
}
