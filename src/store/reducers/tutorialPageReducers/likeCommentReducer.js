import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null
};

const likeCommentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.LIKE_COMMENT_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.LIKE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };
    case actions.LIKE_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default likeCommentReducer;
