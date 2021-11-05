import { Button, Intent } from '@blueprintjs/core';

export default function ImportButton(props) {
  return (
    <div>
      <Button
        intent={Intent.PRIMARY}
        onClick={props.onImport}
        disabled={props.isLoading}
        icon="document"
      >
        Nouvelle Commande
      </Button>
    </div>
  );
}
