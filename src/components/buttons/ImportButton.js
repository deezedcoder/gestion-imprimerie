import LoadingButton from '@mui/lab/LoadingButton';
import PostAddIcon from '@mui/icons-material/PostAdd';

export default function ImportButton(props) {
  return (
    <div>
      <LoadingButton
        size="small"
        color="primary"
        onClick={props.onImport}
        loading={props.isLoading || false}
        loadingPosition="start"
        startIcon={<PostAddIcon />}
        variant="contained"
      >
        Nouvelle Commande
      </LoadingButton>
    </div>
  );
}
