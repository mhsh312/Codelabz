import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null
};

const likeTutorialReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.LIKE_TUTORIAL_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.LIKE_TUTORIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };
    case actions.LIKE_TUTORIAL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default likeTutorialReducer;
