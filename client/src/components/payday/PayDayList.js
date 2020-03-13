import React, { useEffect } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

import { fetchBreadbox } from "../../actions";

import { Typography, Grid, Paper, Container } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto"
    // maxHeight: 300
  },
  listSubHeader:{
    background: "#333",
    color: "#fff"
  },
  inline: {
    display: "inline"
  },
  table: {
    minWidth: 700
  },
  container: {
    maxHeight: 600
  }
}));

const PayDayList = props => {
  const classes = useStyles();

  useEffect(() => {
    props.fetchBreadbox();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h2">
        Pay Day + Bills
      </Typography>

      <List className={classes.root} subheader={<li />}>
        {props.paydays.map(obj =>
          Object.keys(obj).map((x, i) => (
            <li key={`item-${x}`} className={classes.listSection}>
              <ul className={classes.ul}>
          <ListSubheader className={classes.listSubHeader}><Typography variant="h6">{<Moment format="MM-DD-YYYY">{x}</Moment> }</Typography></ListSubheader>
                {Object.keys(obj[x]).map((item, idx) => (
                  <ListItem key={`item-${x}-${item}`}>
                    <div> {console.log(obj[x][idx].bill.name)}</div>
                    <ListItemText
                      primary={`${obj[x][idx].bill.name} - ${obj[x][idx].bill.description}`}
                      secondary={` $${obj[x][idx].bill.amountDue} ${obj[x][idx].bill.dueDay}`}
                    />
                  </ListItem>
                ))}
              </ul>
            </li>
          ))
        )}        
      </List>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    paydays: Object.values(state.paydays)
  };
};

export default connect(mapStateToProps, { fetchBreadbox })(PayDayList);
