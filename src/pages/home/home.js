import { Box } from '@mui/material';
import Header from '../../layout/Header';
import Content from '../../layout/Content';
import Sidebar from '../../layout/Sidebar';
import SidebarButton from '../../components/buttons/SidebarButton';

export default function Home() {
  return (
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
  );
}
