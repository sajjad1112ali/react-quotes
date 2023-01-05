import axios from "axios";

import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATED,
  NOT_AUTHENTICATED,
  LOGING_OUT,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_REQUEST_SUCCESS,
  REGISTER_USER_REQUEST_FAILURE,
} from "./types";

import {
  setToken,
  getToken,
  deleteToken,
  getTokenHeader,
  restForm,
} from "../utils";
import { APIS_URL } from "../../config";

const REACT_APP_APIS_URL = APIS_URL;

const loginRequest = () => {
  return {
    type: AUTHENTICATION_REQUEST,
  };
};

const loginRequestSuccess = (user) => {
  return {
    type: AUTHENTICATED,
    data: user.user,
  };
};

const loginRequestFailure = (error) => {
  return {
    type: NOT_AUTHENTICATED,
    data: error,
  };
};

const logout = () => {
  return {
    type: LOGING_OUT,
  };
};

const getProfileRequest = (user) => {
  return {
    type: GET_PROFILE_REQUEST,
  };
};
const getProfileSuccess = (user) => {
  return {
    type: GET_PROFILE_SUCCESS,
    data: user,
  };
};

const getProfileFailure = (error) => {
  return {
    type: GET_PROFILE_FAILURE,
    data: error,
  };
};

// REGISTER_USER QUOTES
const registerUserRequest = () => {
  return {
    type: REGISTER_USER_REQUEST,
  };
};

const registerUserSuccess = (data) => {
  return {
    type: REGISTER_USER_REQUEST_SUCCESS,
    data,
  };
};

const registerUserFailure = (error) => {
  return {
    type: REGISTER_USER_REQUEST_FAILURE,
    data: error,
  };
};

export const loginUser = (data, navigate, formikForm) => {
  return (dispatch) => {
    const config = {
      method: "post",
      url: `${REACT_APP_APIS_URL}/users`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    axios(config)
      .then((response) => {
        navigate("/");

        setToken(response.headers["x-auth-token"]);
        dispatch(loginRequestSuccess(response.data));
        restForm(formikForm);
      })
      .catch((error) => {
        restForm(formikForm, false);
        dispatch(loginRequestFailure(error.response.data.message));
      });
  };
};
export const logoutUser = (navigate) => {
  return (dispatch) => {
    deleteToken();
    dispatch(logout());
    navigate("/");
  };
};

export const rigisterUser = (data, navigate, formikForm) => {
  return (dispatch) => {
    const config = {
      method: "post",
      url: `${REACT_APP_APIS_URL}/users/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    axios(config)
      .then((response) => {
        navigate("/login");

        dispatch(registerUserSuccess(response.data));
        restForm(formikForm);
      })
      .catch((error) => {
        restForm(formikForm, false);
        dispatch(registerUserFailure(error.response.data.message));
      });
  };
};

export const checkAuth = () => {
  return (dispatch) => {
    return fetch(`${REACT_APP_APIS_URL}/current_user`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((user) => {
          user.data
            ? dispatch({ type: AUTHENTICATED, payload: user })
            : dispatch({ type: NOT_AUTHENTICATED });
        });
      } else {
        return Promise.reject(dispatch({ type: NOT_AUTHENTICATED }));
      }
    });
  };
};

export const getProfile = (id) => {
  const headers = getTokenHeader();

  return (dispatch) => {
    dispatch(getProfileRequest());
    axios
      .get(`${REACT_APP_APIS_URL}/users`, { headers })
      .then((response) => {
        dispatch(getProfileSuccess(response.data));
      })
      .catch((error) => {
        const msg =
          error.code === "ERR_NETWORK"
            ? "NETWOR ERROR"
            : error.response.data.message;
        dispatch(getProfileFailure(msg));
      });
  };
};
