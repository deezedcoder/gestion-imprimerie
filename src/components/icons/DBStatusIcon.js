import { useState } from 'react';
import { Icon } from '@blueprintjs/core';
import { DBSTATUS } from '../../constants/dbstatus';

const DBStatusIcon = (props) => {
  const [dbStatus, setDbStatus] = useState(DBSTATUS.DISCONNECTED);

  window.api.electronIpcOnce('connection-status', (status) => {
    setDbStatus(status);
  });

  return <Icon icon="data-connection" size={32} intent={dbStatus} />;
};

export default DBStatusIcon;
