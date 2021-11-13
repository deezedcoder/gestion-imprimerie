import { useState } from 'react';
import { InputGroup } from '@blueprintjs/core';
import { Box } from '@mui/material';

export default function SearchInput() {
  const [searchValue, SetSearchValue] = useState('');
  const handleSearchChange = (e) => {
    // TODO handle searching
    SetSearchValue('');
  };

  return (
    <Box
      sx={{
        flexBasis: '50%',
      }}
    >
      <InputGroup
        type="search"
        asyncControl={true}
        leftIcon="search"
        onChange={handleSearchChange}
        disabled={false}
        placeholder="Recherche"
        intent="primary"
        value={searchValue}
      />
    </Box>
  );
}
