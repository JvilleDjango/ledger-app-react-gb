import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { createNumberMask } from "redux-form-input-masks";
import BillModal from "../../components/modal/BillModal";
import history from "../../history";
import { fetchBills } from "../../actions";
import BillCreate from "./BillCreate";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography, Button, Container, Box } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Drawer from "@material-ui/core/Drawer";
import Tooltip from "@material-ui/core/Tooltip";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  },
  header: {
    display: "flex",
    justifyContent: "space-between"
  },
  container: {
    maxHeight: 600
  }
});

const BillList = props => {
  const classes = useStyles();

  // Drawer
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  //modal
  const [open, setOpen] = useState(false);
  const [selectedBill, selectBill] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/bills");
  };

  useEffect(() => {
    props.fetchBills();
  }, []);

  const renderMonies = () => {
    return createNumberMask({
      prefix: "$ ",
      // suffix: " per item",
      decimalPlaces: 2,
      locale: "en-US"
    });
  };

  const renderTable = () => {
    return props.bills.map(row => {
      return (
        <StyledTableRow key={row.id}>
          <StyledTableCell component="th" scope="row">
            {row.name}
          </StyledTableCell>
          <StyledTableCell align="right">{row.description}</StyledTableCell>
          <StyledTableCell align="right">
            <Moment format="Do">{row.dueDay}</Moment>
          </StyledTableCell>
          <StyledTableCell align="right">${row.amountDue}</StyledTableCell>
          <StyledTableCell align="right">
            <Tooltip title="Edit" arrow>
              <IconButton
                variant="contained"
                color="primary"
                to={`/bills/edit/${row.id}`}
                component={Link}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <IconButton
              aria-label="delete"
              className={classes.margin}
              onClick={() => {
                handleClickOpen();
                selectBill(row);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </StyledTableCell>
        </StyledTableRow>
      );
    });
  };

  return (
    <Container>
      <BillModal open={open} bill={selectedBill} handleClose={handleClose} />
      <Box className={classes.header}>
        <Typography variant="h4">Bill List</Typography>
        <Tooltip title="Add a Bill" arrow placement="top">
          <IconButton color="primary" onClick={toggleDrawer("bottom", true)}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <TableContainer component={Paper} className={classes.container}>
        <Table
          className={classes.table}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Due Day</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTable()}</TableBody>
        </Table>
      </TableContainer>
      <Drawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer("bottom", false)}
      >
        <BillCreate />
      </Drawer>
    </Container>
  );
};

const mapStateToProps = state => {
  return { bills: Object.values(state.bills) };
};

export default connect(mapStateToProps, { fetchBills })(BillList);
