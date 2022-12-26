import axios from "axios";
import { getTokenHeader } from "../utils";
import { APIS_URL } from "../../config";

const REACT_APP_APIS_URL = APIS_URL;

const {
  GET_QUOTES_REQUEST,
  GET_QUOTES_REQUEST_SUCCESS,
  GET_QUOTES_REQUEST_FAILURE,
  LIKE_QUOTE_REQUEST,
  LIKE_QUOTE_REQUEST_SUCCESS,
  LIKE_QUOTE_REQUEST_FAILURE,
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
// LIKE QUOTES
const likeQuoteRequest = () => {
  return {
    type: LIKE_QUOTE_REQUEST,
  };
};

const likeQuoteSuccess = (payload) => {
  return {
    type: LIKE_QUOTE_REQUEST_SUCCESS,
    payload,
  };
};

const likeQuoteFailure = (error) => {
  return {
    type: LIKE_QUOTE_REQUEST_FAILURE,
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
          dispatch(fetchQuotesSuccess(response.data));
        })
        .catch((error) => {
          const msg =
            error.code === "ERR_NETWORK"
              ? error.message
              : error.response.data.message;

          dispatch(fetchQuotesFailure(msg));
        });
    }, 500);
  };
};

const likeQuote = (id, type) => {
  const uriType = {
    like: "like",
    favourite: "add-favourite",
    removeFavourite: "remove-favourite",
    cc: "like",
  };
  const uri = uriType[type];
  const headers = getTokenHeader();
  return (dispatch) => {
    dispatch(likeQuoteRequest());
    axios
      .post(`${REACT_APP_APIS_URL}/quotes/${id}/${uri}`, null, {
        headers,
      })
      .then((response) => {
        dispatch(likeQuoteSuccess({ ...response.data, uri }));
      })
      .catch((error) => {
        dispatch(likeQuoteFailure(error.response.data.message));
      });
  };
};

export { fetchQuotes, likeQuote };
