const {
  GET_QUOTES_REQUEST,
  GET_QUOTES_REQUEST_SUCCESS,
  GET_QUOTES_REQUEST_FAILURE,
  LIKE_QUOTE_REQUEST,
  LIKE_QUOTE_REQUEST_SUCCESS,
  LIKE_QUOTE_REQUEST_FAILURE,
} = require("./types");

const initialState = {
  loading: false,
  quotes: [],
  quotesLikedBy: [],
  error: "",

  isSubmitting: false,
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
      const { quotes, quotesLikedBy } = action.payload;
      return {
        ...state,
        loading: false,
        quotes,
        quotesLikedBy,
        error: "",
      };
    case GET_QUOTES_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        quotes: [],
        quotesLikedBy: [],
        error: action.payload,
      };
    case LIKE_QUOTE_REQUEST:
      return state;
    case LIKE_QUOTE_REQUEST_SUCCESS:
      const { payload: id } = action;
      const { quotes: stQuote } = state;
      const inddex = stQuote.findIndex((q) => q.id === id);
      state.quotes[0].likeBy.push(1);

      return {
        ...state,
      };
    case LIKE_QUOTE_REQUEST_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default reducer;
