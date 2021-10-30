import { useState, useEffect } from 'react';
import IpcService from './services/IpcService';
import { CHANNELS } from './shared/constants/channels';

export default function useInitialConnection() {
  const [initialConnection, setInitialConnection] = useState(false);
  const [errorConnection, setErrorConnection] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!errorConnection && !initialConnection) {
      const dbConnectService = new IpcService(CHANNELS.DB_CONNECT);
      dbConnectService
        .send()
        .then((ipcMainResponse) => {
          setInitialConnection(true);
        })
        .catch((error) => {
          setErrorConnection(true);
          setErrorMessage(error.toString());
        });
    }
  });

  return {
    initialConnection,
    errorConnection,
    errorMessage,
  };
}
