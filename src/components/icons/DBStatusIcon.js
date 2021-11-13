import { useRecoilValue } from 'recoil';
import paramsState from '../../recoil/atoms/paramsState';
import { DBSTATUS_INTENT } from '../../shared/constants/dbstatusIntents';
import { Icon } from '@blueprintjs/core';
// import StorageIcon from '@mui/icons-material/Storage';

const DBStatusIcon = () => {
  const { dbStatus, dbInitialStatus } = useRecoilValue(paramsState);

  // return <StorageIcon size="large" color={dbStatus || dbInitialStatus} />;
  return (
    <Icon
      icon="data-connection"
      size={24}
      intent={dbStatus || dbInitialStatus || DBSTATUS_INTENT.CONNECT_ERR}
      style={{ alignSelf: 'center', marginLeft: 10 }}
    />
  );
};

export default DBStatusIcon;
