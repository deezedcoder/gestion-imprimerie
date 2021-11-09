import React from 'react';
import { Box } from '@mui/material';
import Header from '../../layout/Header';
import Content from '../../layout/Content';

export default function Home() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Content />
    </Box>
  );
}
