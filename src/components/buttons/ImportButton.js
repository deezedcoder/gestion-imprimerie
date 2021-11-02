import { Button, Intent } from '@blueprintjs/core';

export default function ImportButton() {
  const handleClick = () => {};

  return (
    <div>
      <Button intent={Intent.PRIMARY} onClick={handleClick}>
        Nouvelle Commande
      </Button>
    </div>
  );
}
