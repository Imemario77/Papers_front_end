import { combineReducers } from "redux";

import authReducer from "./authReducer.js";
import businessReducer from "./businessReducer.js";
import otpReducer from "./otpReducer.js";

const rootReducer = combineReducers({
  authReducer,
  businessReducer,
  otpReducer,
});

export default rootReducer;
