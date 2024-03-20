import { combineReducers } from "redux";
import PostReducer from "./postReducer";
import CommentReducer from "./commentReducer";
import FeedReducer from "./feedReducer";
import likeCommentReducer from "./likeCommentReducer";
import dislikeCommentReducer from "./dislikeCommentReducer";

export default combineReducers({
  post: PostReducer,
  comment: CommentReducer,
  feed: FeedReducer,
  likeComment: likeCommentReducer,
  dislikeComment: dislikeCommentReducer
});
