import { useEffect, useState } from 'react';
import { CHANNELS } from '../../shared/constants/channels';
import { Icon } from '@blueprintjs/core';

const DBStatusIcon = (props) => {
  const [dbStatus, setDbStatus] = useState(props.initStatus);

  useEffect(() => {
    window.api.ipcRendererOn(CHANNELS.DB_CONNECT_STATUS, setDbStatus);

    return () => {
      window.api.ipcRendererRemoveListener(
        CHANNELS.DB_CONNECT_STATUS,
        setDbStatus
      );
    };
  }, []);

  return <Icon icon="data-connection" size={32} intent={dbStatus} />;
};

export default DBStatusIcon;
