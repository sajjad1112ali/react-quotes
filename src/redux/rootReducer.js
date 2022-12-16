import { combineReducers } from "redux";
import commentsReducer from "./comments/reducer";
import authenticationReducer from "./authentication/reducer";
import quotesReducer from "./quotes/reducer";
const rootReducer = combineReducers({
  comments: commentsReducer,
  authentication: authenticationReducer,
  quotes: quotesReducer,
});

export default rootReducer;
