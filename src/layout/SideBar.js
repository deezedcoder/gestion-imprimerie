import Container from '@mui/material/Container';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Sidebar() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
          <Button>Imprimerie TOLBA</Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
