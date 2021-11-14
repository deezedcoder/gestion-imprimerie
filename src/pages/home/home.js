import { Fragment } from 'react';
import { Box } from '@mui/material';
import Header from '../../layout/Header';
import Main from '../../layout/Main';
import Sidebar from '../../layout/Sidebar';
import SidebarButton from '../../components/buttons/SidebarButton';
import paramsState from '../../recoil/atoms/paramsState';
import { useRecoilValue } from 'recoil';
import AppSuspense from '../../components/misc/AppSuspence';

export default function Home() {
  const { openBackdrop } = useRecoilValue(paramsState);

  return (
    <Fragment>
      <AppSuspense open={openBackdrop} />
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Sidebar />
        <Box
          sx={{
            // border: '2px solid orange',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            flexGrow: 1,
            overflow: ' hidden',
          }}
        >
          <SidebarButton />
          <Header />
          <Main />
        </Box>
      </Box>
    </Fragment>
  );
}
