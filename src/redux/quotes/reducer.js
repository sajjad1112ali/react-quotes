const {
  GET_QUOTES_REQUEST,
  GET_QUOTES_REQUEST_SUCCESS,
  GET_QUOTES_REQUEST_FAILURE,
} = require("./types");

const initialState = {
  loading: false,
  isSubmitting: false,
  quotes: [],
  error: "",
  singleQuote: null,
  isEdit: false,
  deleteError: "",
  addCommentError: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUOTES_REQUEST:
      return {
        ...state,
        loading: true,
        deleteError: false,
        singleQuote: null,
      };
    case GET_QUOTES_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        quotes: action.payload,
        error: "",
      };
    case GET_QUOTES_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        quotes: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
