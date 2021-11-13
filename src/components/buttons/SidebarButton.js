import { Box, Zoom, Fab } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
import paramsState from '../../recoil/atoms/paramsState';
import { useRecoilState } from 'recoil';
import { grey } from '@mui/material/colors';

export default function SidebarButton() {
  const [params, setParams] = useRecoilState(paramsState);
  const isOpened = params.isSidebarOpened;

  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const boxStyles = {
    position: 'fixed',
    marginTop: '32px',
    zIndex: 10000,
  };

  const fabStyles = {
    position: 'absolute',
    color: grey[500],
    bgcolor: grey[50],
    '&:hover': {
      bgcolor: grey[200],
    },
    left: '-16px',
    top: '16px',
    minHeight: '32px',
    width: '32px',
    height: '32px',
  };

  const chevronStyles = {
    fontSize: '1.1rem',
  };

  const handleClick = (value) => {
    setParams((prevParams) => ({ ...prevParams, isSidebarOpened: value }));
  };

  return (
    <Box sx={boxStyles}>
      {/*  if isOpened is true show close button */}
      <Zoom
        in={isOpened}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${isOpened ? transitionDuration.exit : 0}ms`,
        }}
        // unmountOnExit
      >
        <Fab
          color="primary"
          size="small"
          onClick={() => handleClick(false)}
          sx={fabStyles}
        >
          <ChevronLeftIcon sx={chevronStyles} />
        </Fab>
      </Zoom>
      {/* if isOpened is false show open button */}
      <Zoom
        in={!isOpened}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${!isOpened ? transitionDuration.exit : 0}ms`,
        }}
        // unmountOnExit
      >
        <Fab
          color="primary"
          size="small"
          onClick={() => handleClick(true)}
          sx={fabStyles}
        >
          <ChevronRightIcon sx={chevronStyles} />
        </Fab>
      </Zoom>
    </Box>
  );
}
