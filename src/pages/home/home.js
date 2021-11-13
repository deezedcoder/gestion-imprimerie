import { Fragment } from 'react';
import { Box } from '@mui/material';
import Header from '../../layout/Header';
import Content from '../../layout/Content';
import Sidebar from '../../layout/Sidebar';
import SidebarButton from '../../components/buttons/SidebarButton';
import { Backdrop, CircularProgress } from '@mui/material';
import paramsState from '../../recoil/atoms/paramsState';
import { useRecoilValue } from 'recoil';

export default function Home() {
  const { openBackdrop } = useRecoilValue(paramsState);

  return (
    <Fragment>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop || false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
          <Content />
        </Box>
      </Box>
    </Fragment>
  );
}
