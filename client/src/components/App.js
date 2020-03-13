import React, {useState} from "react";
import { Router, Route, Link } from "react-router-dom";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import { green, lightGreen, blueGrey, red, lightBlue } from "@material-ui/core/colors";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/List";
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./Header";
import history from "../history";

import BillCreate from "./bills/BillCreate";
import BillEdit from "./bills/BillEdit";
import BillDelete from "./bills/BillDelete";
import BillList from "./bills/BillList";
import BillShow from "./bills/BillShow";
import PayDayList from "./payday/PayDayList";

import "../sass/global.scss";
import DashBoard from "./dashboard/Dashboard";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    // color: theme.status.danger,
    // '&$checked': {
    //   color: theme.status.danger,
    // },
    display: "flex",
    marginTop: "100px"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#4caf50',
      // dark: will be calculated from palette.primary.main,
      contrastText: '#ffffff',
    },
    secondary: {
      // light: '#0066ff',
      main: '#ffc400',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#000000',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

const App = () => {
  const classes = useStyles();
 

  return (
    
    <div className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Header />
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.toolbar} />
            <List>
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component={Link} to="/paydays">
                <ListItemIcon>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Pay Day List" />
              </ListItem>
              <ListItem button component={Link} to="/bills">
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Bills" />
              </ListItem>
              <ListItem button component={Link} to="/bills/new">
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Add Bill" />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
              <Route path="/" exact component={DashBoard} />
              <Route path="/paydays" exact component={PayDayList} />
              <Route path="/bills" exact component={BillList} />
              <Route path="/bills/new" exact component={BillCreate} />
              <Route path="/bills/edit/:id" exact component={BillEdit} />
              <Route path="/bills/delete/:id" exact component={BillDelete} />
              <Route path="/bills/show" exact component={BillShow} />
          </main>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
