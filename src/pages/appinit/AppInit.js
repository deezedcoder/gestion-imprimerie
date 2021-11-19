import { useSetRecoilState } from 'recoil';
import paramsState from '../../recoil/atoms/paramsState';
import settingsState from '../../recoil/atoms/settingsState';
import ordersState from '../../recoil/atoms/ordersState';
import AppLoader from '../../components/misc/AppLoader';
import { Container } from '@mui/material';

export default function AppInit({ onInit }) {
  const setParams = useSetRecoilState(paramsState);
  const setSettings = useSetRecoilState(settingsState);
  const setOrders = useSetRecoilState(ordersState);

  const appIsReady = ({ params, settings, orders }) => {
    setParams(params);
    setSettings(settings);
    setOrders(orders);
    onInit();
  };

  return (
    <Container sx={{ height: '100vh' }}>
      <AppLoader onAppReady={appIsReady} />
    </Container>
  );
}
