import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Redirect } from 'react-router';
import appState from '../../recoil/atoms/appState';
import ordersState from '../../recoil/atoms/ordersState';
import AppLoader from '../../components/misc/AppLoader';
import { Container } from '@mui/material';

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
    <Container sx={{ height: '100vh' }}>
      {appReady ? (
        <Redirect to={{ pathname: '/home' }} />
      ) : (
        <AppLoader onAppReady={appIsReady} />
      )}
    </Container>
  );
}
