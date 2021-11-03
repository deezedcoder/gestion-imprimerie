import React, { useState, useEffect } from 'react';
import IpcService from '../../services/IpcService';
import { CHANNELS } from '../../shared/constants/channels';
import { ProgressBar, NonIdealState, Button, Intent } from '@blueprintjs/core';

const appInitService = new IpcService(CHANNELS.APP_INIT);

export default function AppLoader(props) {
  const [error, setError] = useState({ flag: false });

  useEffect(() => {
    console.log('hook');
    if (!error.flag) {
      console.log('init...');
      appInitService
        .send()
        .then((ipcMainResponse) => {
          props.onAppReady(ipcMainResponse.appState);
        })
        .catch((err) => {
          setError(err);
        });
    }
  });

  if (!error.flag) return <ProgressBar intent={Intent.PRIMARY} />;

  return (
    <NonIdealState
      icon={error.icon}
      title={error.title}
      description={error.description}
      action={
        <Button
          intent={Intent.DANGER}
          onClick={() => setError({ flag: false })}
        >
          Recommencer
        </Button>
      }
    />
  );
}
