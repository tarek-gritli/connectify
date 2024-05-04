import { Box, Typography, useTheme } from "@mui/material";
import Friend from "./Friend";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { setFriends } from "../state/reducers/auth";
import axios from "axios";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}/friends`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(setFriends({ friends: response.data }));
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends?.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;