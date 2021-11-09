import React from 'react';
import { AppBar, Toolbar, Stack } from '@mui/material';
import PdfLoader from '../components/misc/PdfLoader';
import SearchInput from '../components/inputs/SearchInput';
import DBStatusIcon from '../components/icons/DBStatusIcon';
import Settings from '../components/buttons/Settings';
import { Divider } from '@blueprintjs/core';

const Header = () => {
  return (
    <AppBar>
      <Toolbar
        sx={{
          backgroundColor: '#FFF',
          pr: '24px', // keep right padding when drawer closed
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
            <Divider />
            <DBStatusIcon />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
