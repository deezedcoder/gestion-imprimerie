import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router';
import AppLoader from '../../components/misc/appLoader';

export default function AppInit() {
  const [appReady, setAppReady] = useState(false);

  return (
    <Fragment>
      {appReady ? <Redirect to={{ pathname: '/home' }} /> : <AppLoader />}
    </Fragment>
  );
}
