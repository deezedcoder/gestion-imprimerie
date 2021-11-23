import { AppBar, Toolbar, Stack } from '@mui/material';
import PdfLoader from '../components/misc/PdfLoader';
import SearchInput from '../components/inputs/SearchInput';
import Settings from '../components/buttons/Settings';

const Header = () => {
  return (
    <AppBar
      sx={{
        position: 'relative',
        paddingLeft: '24px',
        backgroundColor: '#FFF',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <Toolbar
        sx={{
          paddingLeft: '24px',
          paddingRight: '24px',
          minHeight: '64px',
        }}
      >
        <Stack
          sx={{ width: '100%' }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
        >
          <PdfLoader />
          <SearchInput />
          <Stack direction="row">
            <Settings />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
