import axios from "axios";

import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATED,
  NOT_AUTHENTICATED,
  LOGING_OUT,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
} from "./types";

import { setToken, getToken, deleteToken, getTokenHeader, restForm } from "../utils";
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

export const signupUser = (credentials) => {
  return (dispatch) => {
    return fetch(`${REACT_APP_APIS_URL}/users/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: credentials }),
    }).then((res) => {
      if (res.ok) {
        setToken(res.headers.get("x-auth-token"));
        return res.json().then((userJson) => {
          dispatch({ type: AUTHENTICATED, payload: userJson });
        });
      } else {
        return res.json().then((errors) => {
          dispatch({ type: NOT_AUTHENTICATED });
          return Promise.reject(errors);
        });
      }
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
