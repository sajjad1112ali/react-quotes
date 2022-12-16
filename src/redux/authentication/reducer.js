import {
  AUTHENTICATED,
  NOT_AUTHENTICATED,
  LOGING_OUT,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
} from "./types";

import { getToken } from "../../redux/utils";

const initialState = {
  error: "",
  loggedIn: false,
  currentUser: {},
  toke: "",
};

export default function authorization(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        error: "",
        loggedIn: true,
        currentUser: action.data,
        token: getToken(),
      };
    case NOT_AUTHENTICATED:
      return {
        error: action.data,
        loggedIn: false,
        currentUser: {},
        token: "",
      };
    case LOGING_OUT:
      return {
        error: "",
        loggedIn: false,
        currentUser: {},
        token: "",
      };
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        error: "",
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        error: "",
        loggedIn: true,
        currentUser: action.data,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        loggedIn: false,
        error: action.data,
      };
    default:
      return state;
  }
}
