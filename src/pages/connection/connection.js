import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import IpcService from '../../services/IpcService';
import { CHANNELS } from '../../shared/constants/channels';
import { ProgressBar, NonIdealState, Button, Intent } from '@blueprintjs/core';

export default function Connection() {
  const [connected, setConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!connectionError && !connected) {
      const dbConnectService = new IpcService(CHANNELS.DB_CONNECT);
      dbConnectService
        .send()
        .then((ipcMainResponse) => {
          setConnected(true);
        })
        .catch((error) => {
          setConnectionError(true);
          setErrorMessage(error.toString());
        });
    }
  });

  return (
    <React.Fragment>
      {connected ? (
        <Redirect to="/home" />
      ) : !connectionError ? (
        <ProgressBar intent={Intent.PRIMARY} />
      ) : (
        <NonIdealState
          icon="data-connection"
          title="Impossible de se connecter à la base de données"
          description={errorMessage}
          action={
            <Button
              intent={Intent.DANGER}
              onClick={() => setConnectionError(false)}
            >
              Recommencer
            </Button>
          }
        />
      )}
    </React.Fragment>
  );
}
