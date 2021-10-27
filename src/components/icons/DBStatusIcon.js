import React from 'react';

const DBStatusIcon = (props) => {
  return <p>{props.isConnected ? 'Connected' : 'Disconnected'}</p>;
};

export default DBStatusIcon;
