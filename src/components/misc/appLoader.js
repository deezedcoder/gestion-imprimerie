import React, { useState, useEffect } from 'react';
import IpcService from '../../services/IpcService';
import { CHANNELS } from '../../shared/constants/channels';
import { ProgressBar, NonIdealState, Button, Intent } from '@blueprintjs/core';

const appInitService = new IpcService(CHANNELS.APP_INIT);

export default function AppLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});
  const [appState, setAppState] = useState({});

  useEffect(() => {
    console.log('hhhoook');
    appInitService
      .send()
      .then((ipcMainResponse) => {
        setAppState(ipcMainResponse.appState);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <ProgressBar intent={Intent.PRIMARY} />;

  return (
    <NonIdealState
      icon={error.icon}
      title={error.title}
      description={error.description}
      action={<Button intent={Intent.DANGER}>Recommencer</Button>}
    />
  );
}
