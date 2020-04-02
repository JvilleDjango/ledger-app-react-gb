import React from "react";
import { Link } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/List";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";


import {makeStyles} from "@material-ui/core/styles";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
}));

const SidebarMenu = () => {
    const classes = useStyles();
    return (
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
    )

}

export default SidebarMenu;