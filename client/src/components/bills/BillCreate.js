import React from "react";
import { connect } from "react-redux";
import { createBill } from "../../actions";
import BillForm from "./billForm";

import { Container, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

  pageHeader: {
    textAlign: 'center'
  }
}));

const BillCreate = props => {
  
  const classes = useStyles();

  const onSubmit = formValues => {
    props.createBill(formValues);
  };

  const buttonName = 'Add'

  return (
    <div>
      <Typography variant="h4" className={classes.pageHeader}>Add Bill</Typography>
      <br />
      <BillForm onSubmit={onSubmit} buttonName={buttonName}/>
    </div>
  );
};


export default connect(null, { createBill })(BillCreate);
