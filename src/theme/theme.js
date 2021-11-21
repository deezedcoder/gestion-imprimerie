import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        outlined: {
          // Some CSS
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          margin: '2rem',
        },
      },
    },
  },
});

export default theme;
