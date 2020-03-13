import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBill, editBill } from "../../actions";
import BillForm from "./billForm";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

  pageHeader: {
    textAlign: 'center'
  }
}));

const BillEdit = props => {
  const classes = useStyles();

  const onSubmit = formValues => {
    props.editBill(props.match.params.id, formValues);
  };

  useEffect(() => {
    props.fetchBill(props.match.params.id);
  }, []);

  const buttonName = "Update";

  return (
    <div>
      <Typography variant="h4" className={classes.pageHeader}>Edit Bill</Typography>
      <br />
      <BillForm
        buttonName={buttonName}
        onSubmit={onSubmit}
        initialValues={_.pick(
          props.bill,
          "name",
          "description",
          "amountDue",
          "dueDay"
        )}
      />
    </div>
  );
};


const mapStateToProps = (state, ownProps) => {
  return { bill: state.bills[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchBill, editBill })(BillEdit);
