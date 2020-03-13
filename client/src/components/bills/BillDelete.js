import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { fetchBill, deleteBill } from "../../actions";

const BillDelete = props => {
  useEffect(() => {
    props.fetchBill(props.match.params.id);
  }, []);

  const renderActions = () => {
    const { id } = props.match.params;
    return (
      <React.Fragment>
        <button
          onClick={() => props.deleteBill(id)}
          className="ui button negative"
        >
          Yes
        </button>
        <Link to="/Bills" className="ui button">
          No
        </Link>
      </React.Fragment>
    );
  };

  const renderContent = () => {
    if (!props.bill) {
      return "Are you sure you want to delete this bill";
    }

    return `Are you sure you want to delete bill: ${props.bill.name}`;
  };

  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push("/")}
    />
  );
};



const mapStateToProps = (state, ownProps) => {
  return { bill: state.bills[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchBill, deleteBill })(BillDelete);
