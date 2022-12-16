import commentsReducer from "./comments/reducer";
import authenticationReducer from "./authentication/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  comments: commentsReducer,
  authentication: authenticationReducer,
});

export default rootReducer;
