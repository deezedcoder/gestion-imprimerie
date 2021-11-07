import { useRecoilValue } from 'recoil';
import appState from '../../recoil/atoms/appState';
import StorageIcon from '@mui/icons-material/Storage';

const DBStatusIcon = () => {
  const { dbStatus, dbInitialStatus } = useRecoilValue(appState);

  return <StorageIcon size="large" color={dbStatus || dbInitialStatus} />;
};

export default DBStatusIcon;
