import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './index.css';
// import App from './App';
import LoginView from './views/LoginView/LoginView';
import * as serviceWorker from './serviceWorker';

const hist = createBrowserHistory();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196F3"
    },
    secondary: {
      main: "#F50057"
    },
    error: {
      main: "#F44336"
    }
  }
});

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <ThemeProvider theme={theme}>
    <Router history={hist}>
      <Switch>
        <Route exact path="/login" component={LoginView} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
