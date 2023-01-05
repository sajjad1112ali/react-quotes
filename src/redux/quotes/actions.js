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
  ADD_QUOTE_REQUEST,
  ADD_QUOTE_REQUEST_SUCCESS,
  ADD_QUOTE_REQUEST_FAILURE,
  DELETE_QUOTE_REQUEST,
  DELETE_QUOTE_REQUEST_SUCCESS,
  DELETE_QUOTE_REQUEST_FAILURE,
  GET_SINGLE_QUOTE_REQUEST,
  GET_SINGLE_QUOTE_REQUEST_SUCCESS,
  GET_SINGLE_QUOTE_REQUEST_FAILURE,
  UPDATE_QUOTE_REQUEST,
  UPDATE_QUOTE_REQUEST_SUCCESS,
  UPDATE_QUOTE_REQUEST_FAILURE,
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

// ADD QUOTES
const addQuoteRequest = () => {
  return {
    type: ADD_QUOTE_REQUEST,
  };
};

const addQuoteSuccess = (payload) => {
  return {
    type: ADD_QUOTE_REQUEST_SUCCESS,
    payload,
  };
};

const addQuoteFailure = (error) => {
  return {
    type: ADD_QUOTE_REQUEST_FAILURE,
    payload: error,
  };
};

// DELETE QUOTES
const deleteQuoteRequest = () => {
  return {
    type: DELETE_QUOTE_REQUEST,
  };
};

const deleteQuoteSuccess = (payload) => {
  return {
    type: DELETE_QUOTE_REQUEST_SUCCESS,
    payload,
  };
};

const deleteQuoteFailure = (error) => {
  return {
    type: DELETE_QUOTE_REQUEST_FAILURE,
    payload: error,
  };
};

// GET_SINGLE QUOTES
const getSingleQuoteRequest = () => {
  return {
    type: GET_SINGLE_QUOTE_REQUEST,
  };
};

const getSingleQuoteSuccess = (payload) => {
  return {
    type: GET_SINGLE_QUOTE_REQUEST_SUCCESS,
    payload,
  };
};

const getSingleQuoteFailure = (error) => {
  return {
    type: GET_SINGLE_QUOTE_REQUEST_FAILURE,
    payload: error,
  };
};

// UPDATE QUOTES
const updateQuoteRequest = () => {
  return {
    type: UPDATE_QUOTE_REQUEST,
  };
};

const updateQuoteSuccess = (payload) => {
  return {
    type: UPDATE_QUOTE_REQUEST_SUCCESS,
    payload,
  };
};

const updateQuoteFailure = (error) => {
  return {
    type: UPDATE_QUOTE_REQUEST_FAILURE,
    payload: error,
  };
};

const fetchQuotes = (isMyQuotes) => {
  let headers = {};
  const url = isMyQuotes
    ? `${REACT_APP_APIS_URL}/quotes/get/my`
    : `${REACT_APP_APIS_URL}/quotes`;
  if (isMyQuotes) {
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

const restForm = (formProps) => {
  formProps.setSubmitting(false);
  formProps.resetForm();
};

const addQuote = (data, formFormikProps, navigate) => {
  const headers = getTokenHeader();
  return (dispatch) => {
    dispatch(addQuoteRequest());
    setTimeout(() => {
      axios
        .post(`${REACT_APP_APIS_URL}/quotes/add`, data, {
          headers: { ...headers },
        })
        .then((response) => {
          dispatch(addQuoteSuccess(response.data));
          restForm(formFormikProps);
          navigate("/quotes");
        })
        .catch((error) => {
          dispatch(addQuoteFailure(error.response.data.message));
          formFormikProps.setSubmitting(false);
        });
    }, 2000);
  };
};

const deleteQuote = (id) => {
  let headers = getTokenHeader();
  const url = `${REACT_APP_APIS_URL}/quotes/${id}`;

  return (dispatch) => {
    dispatch(deleteQuoteRequest());
    setTimeout(() => {
      axios
        .delete(url, { headers: { ...headers } })
        .then((response) => {
          dispatch(deleteQuoteSuccess(id));
        })
        .catch((error) => {
          const msg =
            error.code === "ERR_NETWORK"
              ? error.message
              : error.response.data.message;

          dispatch(deleteQuoteFailure(msg));
        });
    }, 500);
  };
};

const getSingleQuote = (id) => {
  let headers = getTokenHeader();

  return (dispatch) => {
    dispatch(getSingleQuoteRequest(id));
    axios
      .get(`${REACT_APP_APIS_URL}/quotes/${id}`, {
        headers: { ...headers },
      })
      .then((response) => {
        dispatch(getSingleQuoteSuccess(response.data));
      })
      .catch((error) => {
        dispatch(
          getSingleQuoteFailure({ message: error.response.data.message, id })
        );
      });
  };
};

const updateQuote = (id, data, formFormikProps, navigate) => {
  const headers = getTokenHeader();
  return (dispatch) => {
    dispatch(updateQuoteRequest());
    axios
      .put(`${REACT_APP_APIS_URL}/quotes/${id}`, data, {
        headers: { ...headers },
      })
      .then((response) => {
        restForm(formFormikProps);
        dispatch(updateQuoteSuccess(response.data));
        navigate("/quotes");
      })
      .catch((error) => {
        dispatch(updateQuoteFailure(error.response.data.message));
        formFormikProps.setSubmitting(false);
      });
  };
};

export {
  fetchQuotes,
  likeQuote,
  addQuote,
  deleteQuote,
  getSingleQuote,
  updateQuote,
};
