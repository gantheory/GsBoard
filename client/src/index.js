import React from 'react';
import ReactDOM from 'react-dom';
import Board from './js/Board';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey50, grey400, grey600, grey900} from 'material-ui/styles/colors';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  fontFamily: 'Bitter',
  palette: {
    primary1Color: grey600,
    accent1Color: grey900,
    textColor: grey50,
    disabledColor: grey400,
  },
  button: {
    minWidth: 44,
  }
});

const Wrapper = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Board />
  </MuiThemeProvider>
)
ReactDOM.render(
  <Wrapper />,
  document.getElementById('root')
);
