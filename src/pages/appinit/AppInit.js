import React, { Fragment, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Redirect } from 'react-router';
import appState from '../../recoil/atoms/appState';
import ordersState from '../../recoil/atoms/ordersState';
import AppLoader from '../../components/misc/appLoader';

export default function AppInit() {
  const [appReady, setAppReady] = useState(false);
  const setApp = useSetRecoilState(appState);
  const setOrders = useSetRecoilState(ordersState);

  const appIsReady = (appInitState) => {
    setApp(appInitState.appState);
    setOrders(appInitState.orders);
    setAppReady(true);
  };

  return (
    <Fragment>
      {appReady ? (
        <Redirect to={{ pathname: '/home' }} />
      ) : (
        <AppLoader onAppReady={appIsReady} />
      )}
    </Fragment>
  );
}
