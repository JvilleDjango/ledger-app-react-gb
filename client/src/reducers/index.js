import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import billReducer from "./billReducer";
import paydayReducer from "./paydayReducer";

export default combineReducers({
  form: formReducer,
  bills: billReducer,
  paydays: paydayReducer,
});
