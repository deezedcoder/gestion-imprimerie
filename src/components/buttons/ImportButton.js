import LoadingButton from '@mui/lab/LoadingButton';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Typography } from '@mui/material';

export default function ImportButton(props) {
  return (
    <LoadingButton
      size="medium"
      color="primary"
      onClick={props.onImport}
      loading={props.isLoading || false}
      loadingPosition="start"
      startIcon={<PostAddIcon />}
      variant="contained"
    >
      <Typography variant="caption" noWrap>
        Nouvelle Commande
      </Typography>
    </LoadingButton>
  );
}
