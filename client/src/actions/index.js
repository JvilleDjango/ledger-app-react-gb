import data from "../apis/data";
import history from "../history";
import {
  CREATE_BILL,
  FETCH_BILL,
  FETCH_BILLS,
  DELETE_BILL,
  EDIT_BILL,
  FETCH_BREADBOX
} from "./types";

export const createBill = formValues => {
  return async dispatch => {
    const response = await data.post("/bills", formValues);

    dispatch({ type: CREATE_BILL, payload: response.data });
    history.push("/bills");
  };
};

export const fetchBills = () => {
  return async dispatch => {
    const response = await data.get("/bills");

    dispatch({ type: FETCH_BILLS, payload: response.data });
  };
};

export const fetchBill = id => {
  return async dispatch => {
    const response = await data.get(`/bills/${id}`);

    dispatch({ type: FETCH_BILL, payload: response.data });
  };
};

export const editBill = (id, formValues) => {
  return async dispatch => {
    const response = await data.patch(`/bills/${id}`, formValues);

    dispatch({ type: EDIT_BILL, payload: response.data });
    history.push("/bills");
  };
};

export const deleteBill = id => {
  return async dispatch => {
    await data.delete(`/bills/${id}`);

    dispatch({ type: DELETE_BILL, payload: id });
    history.push("/bills");
  };
};


export const fetchBreadbox = () => {
  return async dispatch => {
    const response = await data.get("/breadbox");

    dispatch({ type: FETCH_BREADBOX, payload: response.data });
  }
}


