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
} = require("./types");

const initialState = {
  loading: false,
  quotes: [],
  quotesLikedBy: [],
  addBlogError: "",
  error: "",

  isSubmitting: false,
  singleQuote: null,
  isEdit: false,
  deleteError: "",
};
const removeItemOnce = (arr, value) => {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

const removeQuote = (arr, value) => {
  const index = arr.findIndex((e) => e.id === value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

const quoteActionResponse = (payload, state) => {
  const { data, uri: type } = payload;
  const { quote_id, user_id } = data;
  const index = state.quotes.findIndex((q) => q.id === quote_id);
  const actionArray = type === "like" ? "likeBy" : "favouriteBy";
  const actionCount = type === "like" ? "likeCounts" : "favouriteCounts";
  if (type === "remove-favourite") {
    state.quotes[index][actionArray] = removeItemOnce(
      state.quotes[index][actionArray],
      user_id
    );
    state.quotes[index][actionCount] -= 1;
  } else {
    state.quotes[index][actionArray].push(user_id);
    state.quotes[index][actionCount] += 1;
  }
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

    case ADD_QUOTE_REQUEST:
      return {
        ...state,
      };
    case ADD_QUOTE_REQUEST_SUCCESS:
      return {
        ...state,
      };
    case ADD_QUOTE_REQUEST_FAILURE:
      return {
        ...state,
        addBlogError: action.payload,
      };

    case DELETE_QUOTE_REQUEST:
      return state;
    case DELETE_QUOTE_REQUEST_SUCCESS:
      const qq = removeQuote(state.quotes, action.payload);
      return {
        ...state,
        quotes: qq,
      };
    case DELETE_QUOTE_REQUEST_FAILURE:
      return {
        ...state,
        addBlogError: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
