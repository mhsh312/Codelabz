import {
  Grid,
  Typography,
  Avatar,
  Button,
  IconButton,
  Paper
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CardActions from "@mui/material/CardActions";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ToggleButton from "@mui/lab/ToggleButton";
import ToggleButtonGroup from "@mui/lab/ToggleButtonGroup";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef
} from "react";
import Textbox from "./Textbox";
import User from "../UserDetails";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import {
  getCommentData,
  getCommentReply,
  addComment,
  likeComment,
  dislikeComment
} from "../../../../store/actions/tutorialPageActions";
const useStyles = makeStyles(() => ({
  container: {
    margin: "10px 0",
    padding: "20px",
    overflow: "unset"
  },
  bold: {
    fontWeight: "600"
  },
  comments: {
    margin: "5px",
    padding: "10px 15px"
  },
  settings: {
    flexWrap: "wrap",
    marginTop: "-10px",
    padding: "0 5px"
  },
  small: {
    padding: "2px"
  }
}));

const Comment = ({ id }) => {
  const classes = useStyles();
  const [showReplyfield, setShowReplyfield] = useState(false);
  const [alignment, setAlignment] = React.useState(null);
  const [count, setCount] = useState(0);
  const firestore = useFirestore();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  useState(() => {
    getCommentData(id)(firebase, firestore, dispatch);
  }, [id]);

  const currentUserHandle = useSelector(
    ({
      firebase: {
        profile: { handle }
      }
    }) => handle
  );

  const commentsArray = useSelector(
    ({
      tutorialPage: {
        comment: { data }
      }
    }) => data
  );

  const [comment] = commentsArray.filter(comment => comment.comment_id == id);

  const repliesArray = useSelector(
    ({
      tutorialPage: {
        comment: { replies }
      }
    }) => replies
  );

  const [replies] = repliesArray.filter(replies => replies.comment_id == id);

  const calculateLikes = () => {
    setCount(comment?.likers.length - comment?.dislikers.length);
    if (comment?.likers.includes(currentUserHandle)) {
      setAlignment("left");
    } else if (comment?.dislikers.includes(currentUserHandle)) {
      setAlignment("right");
    }
  };

  useEffect(() => calculateLikes());

  const handleLike = () => {
    likeComment(id, currentUserHandle)(firestore, dispatch);
    if (alignment === "left") {
      comment.likers = comment?.likers.filter(
        like => like !== currentUserHandle
      );
    } else {
      comment.dislikers = comment?.dislikers.filter(
        dislike => dislike !== currentUserHandle
      );
      comment.likers = [...comment.likers, currentUserHandle];
    }
    calculateLikes();
  };

  const handleDislike = () => {
    dislikeComment(id, currentUserHandle)(firestore, dispatch);
    if (alignment === "right") {
      comment.dislikers = comment?.dislikers.filter(
        dislike => dislike !== currentUserHandle
      );
    } else {
      comment.likers = comment?.likers.filter(
        like => like !== currentUserHandle
      );
      comment.dislikers = [...comment.dislikers, currentUserHandle];
    }
    calculateLikes();
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleSubmit = comment => {
    const commentData = {
      content: comment,
      replyTo: comment.comment_id,
      tutorial_id: comment.tutorial_id,
      createdAt: firestore.FieldValue.serverTimestamp(),
      userId: currentUserHandle,
      likers: [currentUserHandle],
      dislikers: []
    };
    addComment(commentData)(firebase, firestore, dispatch);
  };

  return (
    comment && (
      <>
        <Paper variant="outlined" className={classes.comments}>
          <Typography mb={1} sx={{ fontSize: "18px" }}>
            {comment?.content}
          </Typography>
          <Grid container justifyContent="space-between">
            <User
              id={comment?.userId}
              timestamp={comment?.createdAt}
              size={"sm"}
            />
            <CardActions className={classes.settings} disableSpacing>
              {!showReplyfield && (
                <Button
                  onClick={() => {
                    setShowReplyfield(true);
                    getCommentReply(id)(firebase, firestore, dispatch);
                  }}
                  sx={{ textTransform: "none", fontSize: "12px" }}
                >
                  {replies?.replies?.length > 0 && replies?.replies?.length}{" "}
                  Reply
                </Button>
              )}
              <ToggleButtonGroup
                size="small"
                className={classes.small}
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                <ToggleButton
                  className={classes.small}
                  onClick={handleLike}
                  value="left"
                  aria-label="left aligned"
                >
                  <KeyboardArrowUpIcon />
                  <span>{count}</span>
                </ToggleButton>
                <ToggleButton
                  className={classes.small}
                  onClick={handleDislike}
                  value="right"
                  aria-label="right aligned"
                >
                  <KeyboardArrowDownIcon />
                </ToggleButton>
              </ToggleButtonGroup>
              <IconButton aria-label="share" data-testId="MoreIcon">
                <MoreVertOutlinedIcon />
              </IconButton>
            </CardActions>
          </Grid>
        </Paper>
        {showReplyfield && (
          <div style={{ margin: "10px 0 0 10px" }}>
            <Textbox type="reply" handleSubmit={handleSubmit} />
            {replies?.replies.map((id, index) => {
              return <Comment id={id} />;
            })}
          </div>
        )}
      </>
    )
  );
};

export default Comment;
