import React from "react";
import { Router, Route } from "react-router-dom";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";

import {
  green,
  lightGreen,
  blueGrey,
  red,
  lightBlue
} from "@material-ui/core/colors";



import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "../components/header/Header";
import SidebarMenu from "../components/sidebar-menu/sidebar-menu";
import history from "../history";

import BillCreate from "./bills/BillCreate";
import BillEdit from "./bills/BillEdit";
// import BillDelete from "./bills/BillDelete";
import BillList from "./bills/BillList";
import BillShow from "./bills/BillShow";
import PayDayList from "./payday/PayDayList";
import DashBoard from "./dashboard/Dashboard";

import "../sass/global.scss";




const useStyles = makeStyles(theme => ({
  root: {
    // color: theme.status.danger,
    // '&$checked': {
    //   color: theme.status.danger,
    // },
    display: "flex",
    marginTop: "100px"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#4caf50",
      // dark: will be calculated from palette.primary.main,
      contrastText: "#ffffff"
    },
    secondary: {
      // light: '#0066ff',
      main: "#ffc400",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#000000"
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
});

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Header />
          <SidebarMenu />
          <main className={classes.content}>
            <Route path="/" exact component={DashBoard} />
            <Route path="/paydays" exact component={PayDayList} />
            <Route path="/bills" exact component={BillList} />
            <Route path="/bills/new" exact component={BillCreate} />
            <Route path="/bills/edit/:id" exact component={BillEdit} />
            {/* <Route path="/bills/delete/:id" exact component={BillDelete} /> */}
            <Route path="/bills/show" exact component={BillShow} />
          </main>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
