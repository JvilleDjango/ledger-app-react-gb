import _ from "lodash";
import { FETCH_BREADBOX } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_BREADBOX:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
