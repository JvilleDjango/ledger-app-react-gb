import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
         <Typography variant="h6" className={classes.title}>
          LE-JER BOX
        </Typography>
        {/* // <Button color="inherit" component={Link} to="/">
        //   Ledger
        // </Button>
        // <Button color="inherit" component={Link} to="/bills">
        //   Bill List
        // </Button>
        // <Button color="inherit" component={Link} to="/bills/new">
        //   Add Bill
        // </Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
