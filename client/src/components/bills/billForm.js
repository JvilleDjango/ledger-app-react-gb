import React from "react";
import Link from 'react-router-dom';
import { Field, reduxForm } from "redux-form";
import history from "../../history";

import { MuiPickersUtilsProvider, KeyboardDatePicker , } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { createNumberMask } from "redux-form-input-masks";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import moment from "moment";
import momentLocalizer from "react-widgets-moment";

import "react-widgets/dist/css/react-widgets.css";
momentLocalizer(moment);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  Button: {
    width: 100,
    alignSelf: "flex-end"
  },
  pageHeader: {
    textAlign: 'center'
  }
}));

const BillForm = props => {
  const classes = useStyles();

  const renderDateTimePicker = ({ input: { onChange, value }, showTime }) => {
    return (

      <MuiPickersUtilsProvider utils={MomentUtils} >
        <KeyboardDatePicker   
        onChange={onChange}
        format="DD MMM YYYY"
        // time={showTime}
        className={classes.textField}
        value={!value ? null : new Date(value)} 
        inputVariant="outlined"
        label="Due Day"
        />
      </MuiPickersUtilsProvider>
    );
  };

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className=" ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <TextField
        className={classes.textField}
        id="outlined-basic"
        label={label}
        variant="outlined"
        {...input}
        errortext={renderError(meta)}
        style={{ margin: 8 }}
      />
    );
  };

  const onSubmit = formValues => {
    props.onSubmit(formValues);
    history.push("/bills");
  };

  const renderMonies = () => {
    return createNumberMask({
      prefix: "$ ",
      // suffix: " per item",
      decimalPlaces: 2,
      locale: "en-US"
    });
  };

  return (
    <form
      onSubmit={props.handleSubmit(onSubmit)}
      // className="ui form error"
      className={classes.root}
    >
      <Field name="name" component={renderInput} label="Bill Name" />
      <Field
        name="description"
        component={renderInput}
        label="Bill Description"
      />
      <Field
        name="dueDay"
        component={renderDateTimePicker}
        label="Due Day"
        // showTime={false}
      />
      <Field
        name="amountDue"
        component={renderInput}
        label="Amount Due"
        {...renderMonies()}
      />

      <br />

      <Button type="submit" variant="contained" color="primary"  className={classes.Button}>
        {props.buttonName}
      </Button>
    </form>
  );
};

const validate = formValues => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "Enter a Name";
  }
  if (!formValues.description) {
    errors.description = "Enter a Description";
  }
  if (!formValues.dueDay) {
    errors.dueDay = "Enter a Due Day";
  }
  if (!formValues.amountDue) {
    errors.amountDue = "Enter an Amount Due";
  }

  return errors;
};

export default reduxForm({
  form: "billForm",
  validate
})(BillForm);
