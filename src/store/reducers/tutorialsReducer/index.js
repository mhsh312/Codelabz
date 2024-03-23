import { combineReducers } from "redux";
import editorReducer from "./editorReducer";
import dataReducer from "./dataReducer";
import createReducer from "./createReducer";
import likeTutorialReducer from "./likeReducer";
import dislikeTutorialReducer from "./dislikeReducer";
import currentReducer from "./currentReducer";
import imageReducer from "./imageReducer";

export default combineReducers({
  editor: editorReducer,
  data: dataReducer,
  create: createReducer,
  current: currentReducer,
  images: imageReducer,
  like: likeTutorialReducer,
  dislike: dislikeTutorialReducer
});
