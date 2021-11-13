import React, { Suspense, lazy } from 'react';
import { useRecoilValue } from 'recoil';
import componentState from '../recoil/atoms/componentState';
import { CircularProgress, Backdrop } from '@mui/material';

export default function Main() {
  const component = useRecoilValue(componentState);
  const Content = lazy(() => import('../contents/' + component));

  return (
    <Suspense
      fallback={
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    >
      <Content />
    </Suspense>
  );
}
