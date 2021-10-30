// TODO Extract this logic into a custom hook and simplify code
// TODO add more styling: centering, text, containers...
import ImportButton from './components/buttons/ImportButton';
import DBStatusIcon from './components/icons/DBStatusIcon';
import useInitialConnection from './components/hooks/useInitialConnection';
import { ProgressBar, NonIdealState, Button, Intent } from '@blueprintjs/core';
import './App.css';

export default function App() {
  const { initialConnection, errorConnection, errorMessage } =
    useInitialConnection();

  return (
    <div className="App">
      {!initialConnection && !errorConnection && (
        <ProgressBar intent={Intent.PRIMARY} />
      )}
      {!initialConnection && errorConnection && (
        <NonIdealState
          icon="data-connection"
          title="Impossible de ce connecter à la base de données"
          description={errorMessage}
          action={
            <Button
              intent={Intent.DANGER}
              // onClick={() => setErrorConnection(false)}
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
