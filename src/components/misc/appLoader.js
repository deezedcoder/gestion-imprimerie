import React, { useState, useEffect } from 'react';
import IpcService from '../../services/IpcService';
import { CHANNELS } from '../../shared/constants/channels';
import { Box, CircularProgress, Typography } from '@mui/material';
import { NonIdealState, Button, Intent } from '@blueprintjs/core';

const appInitService = new IpcService(CHANNELS.APP_INIT);

export default function AppLoader(props) {
  const [error, setError] = useState({ flag: false });

  useEffect(() => {
    if (!error.flag) {
      appInitService
        .send()
        .then((ipcMainResponse) => {
          props.onAppReady(ipcMainResponse);
        })
        .catch((err) => {
          setError(err);
        });
    }
  });

  if (!error.flag) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          flexDirection: 'column',
        }}
      >
        <CircularProgress size={80} thickness={2} />
        <Typography variant="h5" color="text.secondary" sx={{ m: 2 }}>
          Chargements
        </Typography>
      </Box>
    );
  }

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
