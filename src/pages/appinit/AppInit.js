import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Redirect } from 'react-router';
import paramsState from '../../recoil/atoms/paramsState';
import settingsState from '../../recoil/atoms/settingsState';
import ordersState from '../../recoil/atoms/ordersState';
import AppLoader from '../../components/misc/AppLoader';
import { Container } from '@mui/material';

export default function AppInit() {
  const [appReady, setAppReady] = useState(false);
  const setParams = useSetRecoilState(paramsState);
  const setSettings = useSetRecoilState(settingsState);
  const setOrders = useSetRecoilState(ordersState);

  const appIsReady = ({ params, settings, orders }) => {
    setParams(params);
    setSettings(settings);
    setOrders(orders);
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
