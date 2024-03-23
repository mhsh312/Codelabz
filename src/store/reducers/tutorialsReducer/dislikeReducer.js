import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null
};

const dislikeTutorialReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.DISLIKE_TUTORIAL_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.DISLIKE_TUTORIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };
    case actions.DISLIKE_TUTORIAL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default dislikeTutorialReducer;
