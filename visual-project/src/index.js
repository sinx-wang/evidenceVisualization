import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

// import App from './App';
import LoginView from "./views/LoginPages/LoginView";
import CaseListLayout from "./layouts/CaseListLayout";
import ModelLayout from "./layouts/ModelLayout";

// https://www.cnblogs.com/nangezi/p/11490778.html
const hist = createBrowserHistory();

// 对theme的自定义，详见https://material-ui.com/zh/customization/theming/
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196F3",
    },
    secondary: {
      main: "#F50057",
    },
    error: {
      main: "#F44336",
    },
  },
});

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <MuiThemeProvider theme={theme}>
    <Router history={hist}>
      <Switch>
        <Route exact path="/login" component={LoginView} />
        <Route path="/cases" component={CaseListLayout} />
        <Route path="/model" component={ModelLayout} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
