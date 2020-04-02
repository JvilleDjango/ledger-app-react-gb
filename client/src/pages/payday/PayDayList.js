import React, { useEffect } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

import { fetchBreadbox } from "../../actions";

import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  listSubHeader: {
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

const PayDayList = ({ paydays, fetchBreadbox }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchBreadbox();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h2">
        BreadBOX
      </Typography>
      <br />

      <List className={classes.root} subheader={<li />}>
        {paydays.map(payday => {
          return Object.keys(payday).map(item => (
            <li key={`item-${item}`} className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader className={classes.listSubHeader}>
                  <Typography variant="h6">
                    {
                      <>
                      <Moment format="MMMM Do YYYY">{payday[item].startDate}</Moment> to <Moment format="MMMM Do YYYY">{payday[item].endDate}</Moment>
                      </>
                    }
                  </Typography>
                </ListSubheader>
                {payday[item].bill.map((bill, i) => (
                  <ListItem key={`item-${bill.id + i}`}>
                    <ListItemText
                      primary={`${bill.name} - ${bill.description}`}
                      secondary={ <> ${bill.amountDue}  - <Moment format="Do">{bill.dueDay}</Moment> </>}
                    />
                  </ListItem>
                ))}
              </ul>
            </li>
          ));
        })}
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
