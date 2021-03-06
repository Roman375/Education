import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    color: '#fff',
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#ba0000'
    },
    secondary: {
      main: '#fdce4d'
    },
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    contrastText: '#fff',
  }
});
