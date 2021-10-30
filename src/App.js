// TODO Extract this logic into a custom hook and simplify code
// TODO add more styling: centering, text, containers...
import { useState, useEffect } from 'react';
import IpcService from './services/IpcService';
import ImportButton from './components/buttons/ImportButton';
import DBStatusIcon from './components/icons/DBStatusIcon';
import { CHANNELS } from './shared/constants/channels';
import { ProgressBar, NonIdealState, Button, Intent } from '@blueprintjs/core';
import './App.css';

export default function App() {
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

  return (
    <div className="App">
      {!initialConnection && !errorConnection && (
        <ProgressBar intent={Intent.PRIMARY} />
      )}
      {!initialConnection && errorConnection && (
        <NonIdealState
          icon="data-connection"
          title="Impossible de se connecter à la base de données"
          description={errorMessage}
          action={
            <Button
              intent={Intent.DANGER}
              onClick={() => setErrorConnection(false)}
            >
              Recommencer
            </Button>
          }
        />
      )}
      {initialConnection && (
        <div>
          <DBStatusIcon />
          <ImportButton />
        </div>
      )}
    </div>
  );
}
