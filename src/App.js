import React, { Component } from "react";
import { Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MasukPagar from "./bagian/MasukPagar";
import DataUtama from "./bagian/Admin/DataUtama";
import MenuGuru from "./bagian/Guru/MenuGuru";
import Ujian from "./bagian/Murid/Ujian";
import Soal from "./bagian/Murid/Soal";
import { AuthRoute } from "react-router-auth";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#fff"
    },
    ketiga: "green"
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Route exact path="/" component={MasukPagar} />
          {/* <Route exact path="/data-utama" component={DataUtama} /> */}
          {/* <Route exact path="/menu-guru" component={MenuGuru} /> */}
          {/* <Route exact path="/ujian" component={Ujian} />
          <Route exact path="/soal" component={Soal} /> */}
          <AuthRoute
            path="/data-utama"
            component={DataUtama}
            redirectTo="/"
            authenticated={window.localStorage.getItem("tipe") === "admin"}
          />
          <AuthRoute
            path="/menu-guru"
            component={MenuGuru}
            redirectTo="/"
            authenticated={window.localStorage.getItem("tipe") === "guru"}
          />
          <AuthRoute
            path="/ujian"
            component={Ujian}
            redirectTo="/"
            authenticated={window.localStorage.getItem("tipe") === "murid"}
          />
          <AuthRoute
            path="/soal"
            component={Soal}
            redirectTo="/"
            authenticated={window.localStorage.getItem("tipe") === "murid"}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
