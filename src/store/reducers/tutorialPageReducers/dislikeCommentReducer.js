import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null
};

const dislikeCommentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.DISLIKE_COMMENT_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.DISLIKE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };
    case actions.DISLIKE_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default dislikeCommentReducer;
