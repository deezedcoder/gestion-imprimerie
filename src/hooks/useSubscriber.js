import { useState, useEffect } from 'react';
import { CHANNELS } from '../shared/constants/channels';

export default function useSubscriber() {
  const [dbStatus, setDbStatus] = useState();

  useEffect(() => {
    window.api.ipcRendererOn(CHANNELS.DB_CONNECT_STATUS, setDbStatus);

    return () => {
      window.api.ipcRendererRemoveListener(
        CHANNELS.DB_CONNECT_STATUS,
        setDbStatus
      );
    };
  }, []);

  return { dbStatus };
}
