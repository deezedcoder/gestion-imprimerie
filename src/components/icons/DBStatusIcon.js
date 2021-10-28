import React from 'react';

const DBStatusIcon = (props) => {
  window.api.electronIpcOn('connection-status', (message) =>
    console.log(message)
  );

  return <p>{props.isConnected ? 'Connected' : 'Disconnected'}</p>;
};

export default DBStatusIcon;
