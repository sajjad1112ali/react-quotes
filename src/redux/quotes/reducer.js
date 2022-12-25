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

const quoteActionResponse = (payload, state) => {
  const { data, uri: type } = payload;
  const { quote_id, user_id } = data;
  const index = state.quotes.findIndex((q) => q.id === quote_id);
  const actionArray = type === "like" ? "likeBy" : "favouriteBy";
  const actionCount = type === "like" ? "likeCounts" : "favouriteCounts";
  state.quotes[index][actionArray].push(user_id);
  state.quotes[index][actionCount] += 1;
  return state;
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
      const { payload } = action;
      const updatedState = quoteActionResponse(payload, state);

      return {
        ...updatedState,
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
