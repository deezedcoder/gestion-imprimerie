import React, { Suspense, lazy } from 'react';
import { useRecoilValue } from 'recoil';
import componentState from '../recoil/atoms/componentState';
import AppSuspense from '../components/misc/AppSuspence';
import { Box } from '@mui/material';

export default function Main() {
  const component = useRecoilValue(componentState);
  const Content = lazy(() => import('../contents/' + component));

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
      <Suspense fallback={<AppSuspense open={true} />}>
        <Content />
      </Suspense>
    </Box>
  );
}
