import { Fragment } from 'react';
import { Box, Typography, SvgIcon, Divider } from '@mui/material';
import { ReactComponent as LogoIcon } from '../../assets/images/logo.svg';

const HeaderLogo = ({ fullLength }) => {
  return (
    <Box
      sx={{
        minHeight: '64px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        padding: '16px 32px 16px 20px',
        justifyContent: 'space-between',
      }}
    >
      <SvgIcon
        component={LogoIcon}
        sx={{ fontSize: 40, padding: '0px' }}
        viewBox="0 0 203 203"
      />
      {fullLength && (
        <Fragment>
          <Divider orientation="vertical" flexItem />
          <Typography variant="subtitle2">Imprimerie TOLBA</Typography>
        </Fragment>
      )}
    </Box>
  );
};

export default HeaderLogo;
