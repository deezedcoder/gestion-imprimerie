import { CircularProgress, Backdrop } from '@mui/material';

export default function AppSuspense({ open }) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open || false}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
