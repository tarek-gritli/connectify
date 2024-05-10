import { Box, Typography } from "@mui/material";
import Friend from "./Friend";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { setFriends } from "../state/reducers/auth";
import axios from "axios";
import { useGetAuthenticationStatus } from "../hooks/useGetAuthenticationStatus";
import { useGetCustomPaletteColors } from "../hooks/useGetCustomPaletteColors";

const FriendListWidget = () => {
  const dispatch = useDispatch();
  const { neutralDark } = useGetCustomPaletteColors();
  const { userId, token } = useGetAuthenticationStatus();
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
        color={neutralDark}
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
