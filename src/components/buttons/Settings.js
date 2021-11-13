import { IconButton } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export default function Settings() {
  return (
    <IconButton
      sx={{
        ':hover': {
          color: '#106ba3',
          backgroundColor: '#2196f31a',
        },
      }}
    >
      <SettingsOutlinedIcon />
    </IconButton>
  );
}
