import axios from "axios";
import { getTokenHeader } from "../utils";

const REACT_APP_APIS_URL = process.env.REACT_APP_APIS_URL;

const {
  GET_QUOTES_REQUEST,
  GET_QUOTES_REQUEST_SUCCESS,
  GET_QUOTES_REQUEST_FAILURE,
} = require("./types");

const fetchQuotesRequest = () => {
  return {
    type: GET_QUOTES_REQUEST,
  };
};

const fetchQuotesSuccess = (quotes) => {
  return {
    type: GET_QUOTES_REQUEST_SUCCESS,
    payload: quotes,
  };
};

const fetchQuotesFailure = (error) => {
  return {
    type: GET_QUOTES_REQUEST_FAILURE,
    payload: error,
  };
};

const fetchQuotes = (type) => {
  let headers = {};
  const url =
    type !== "myQuotes"
      ? `${REACT_APP_APIS_URL}/quotes`
      : `${REACT_APP_APIS_URL}/quotes/get/my`;
  if (type === "myQuotes") {
    headers = getTokenHeader();
  }

  return (dispatch) => {
    dispatch(fetchQuotesRequest());
    setTimeout(() => {
      axios
        .get(url, { headers: { ...headers } })
        .then((response) => {
          console.log(response.data)
          dispatch(fetchQuotesSuccess(response.data));
        })
        .catch((error) => {
          const msg =
            error.code === "ERR_NETWORK"
              ? error.message
              : error.response.data.message;

          dispatch(fetchQuotesFailure(msg));
        });
    }, 1000);
  };
};

export {
  fetchQuotes,
};
