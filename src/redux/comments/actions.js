import { GET_COMMENTS, ADD_COMMENT } from "./types";

export const getComments = () => {
  return {
    type: GET_COMMENTS,
  };
};

export const addComment = (data) => {
  return {
    type: ADD_COMMENT,
    data,
  };
};
