import _ from "lodash";
import {
  CREATE_BILL,
  FETCH_BILL,
  FETCH_BILLS,
  DELETE_BILL,
  EDIT_BILL
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_BILLS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_BILL:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_BILL:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_BILL:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_BILL:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
