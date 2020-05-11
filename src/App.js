import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Provider } from 'react-redux'
import store from './store'
import "./App.css";

import Game from "./Game";

const appTheme = createMuiTheme({
  typography: {
    fontFamily: "DMMONOREG"
  }
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Game />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
