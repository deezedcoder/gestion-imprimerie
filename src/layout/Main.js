import React from 'react';
import { useRecoilValue } from 'recoil';
import componentState from '../recoil/atoms/componentState';
import { Box } from '@mui/material';

export default function Main() {
  const content = useRecoilValue(componentState);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        overflow: 'auto',
        paddingTop: '64px',
        backgroundColor: '#f2faff',
      }}
    >
      {content}
    </Box>
  );
}
