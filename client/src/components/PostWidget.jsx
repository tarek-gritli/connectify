import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Button,
  TextField,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import Friend from "./Friend";
import WidgetWrapper from "./WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state/reducers/auth";
import UserImage from "./UserImage";
import axios from "axios";
const PostWidget = ({ _id, user, content, picturePath, likes, comments }) => {
  const [isComments, setIsComments] = useState(false);
  const [isLikes, setIsLikes] = useState(false);
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = likes.find((user) => user._id === loggedInUserId) != null;

  const likeCount = likes.length;
  console.log(comments);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const likePost = async () => {
    const response = await axios.patch(
      `http://localhost:3000/posts/like/${_id}`,
      { userId: loggedInUserId },
      {
        headers: {
          authorization: token,
        },
      }
    );

    const updatedPost = response.data;
    dispatch(setPost({ post: updatedPost }));
  };
  const handleAddComment = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/posts/comment/${_id}`,
        { userId: loggedInUserId, comment: newComment },
        {
          headers: {
            authorization: token,
          },
        }
      );
      const updatedPost = response.data;
      dispatch(setPost({ post: updatedPost }));
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  };
  const name = `${user?.firstName} ${user?.lastName}`;
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={user?._id}
        name={name}
        userPicturePath={user?.picturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {content}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3000/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => likePost()}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography
              onClick={() => {
                setIsLikes(!isLikes);
                if (isComments) setIsComments(false);
              }}
              sx={{ cursor: "pointer" }}
            >
              {likeCount}
            </Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={() => {
                setIsComments(!isComments);
                if (isLikes) setIsLikes(false);
              }}
            >
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isLikes && (
        <>
          <Box mt="0.5rem">
            <Typography>Likes</Typography>
            {likes?.map((user, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <FlexBetween>
                  <UserImage image={user?.picturePath} />
                  <Typography variant="subtitle2">
                    {user?.firstName} {user?.lastName}
                  </Typography>
                </FlexBetween>
              </Box>
            ))}
            <Divider />
          </Box>
        </>
      )}
      {isComments && (
        <>
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <FlexBetween>
                  <FlexBetween>
                    <UserImage image={comment?.user?.picturePath} />
                    <Typography variant="subtitle2">
                      {comment?.user?.firstName} {comment?.user?.lastName}
                    </Typography>
                  </FlexBetween>
                  <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                    {comment.content}
                  </Typography>
                </FlexBetween>
              </Box>
            ))}
            <Divider />
          </Box>
          <Box mt="0.5rem">
            <TextField
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              label="Add a comment"
              variant="outlined"
              fullWidth
              multiline
            />
            <Box mt="0.5rem" display="flex" justifyContent="flex-end">
              <Button
                onClick={handleAddComment}
                variant="contained"
                color="primary"
                disabled={!newComment}
              >
                Add Comment
              </Button>
            </Box>
          </Box>
        </>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
