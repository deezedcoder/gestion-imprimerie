import { useRecoilValue } from 'recoil';
import appState from '../../recoil/atoms/appState';
import { Icon } from '@blueprintjs/core';

const DBStatusIcon = () => {
  const { dbStatus, dbInitialStatus } = useRecoilValue(appState);

  return (
    <Icon
      icon="data-connection"
      size={32}
      intent={dbStatus || dbInitialStatus}
    />
  );
};

export default DBStatusIcon;
