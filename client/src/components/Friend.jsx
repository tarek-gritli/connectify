import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state/reducers/auth";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import axios from "axios";
import { useGetAuthenticationStatus } from "../hooks/useGetAuthenticationStatus.js";
const Friend = ({ friendId, name, userPicturePath, location }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { friends } = useSelector((state) => state.user);
  const { _id, token } = useGetAuthenticationStatus();
  const { palette } = useTheme();
  const { light, dark } = palette.primary;
  const { medium, main } = palette.neutral;

  const isFriend = friends?.find((friend) => friend._id === friendId);
  const addFriend = async () => {
    const response = await axios.patch(
      `http://localhost:3000/users/${_id}/add/${friendId}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(setFriends({ friends: response.data }));
  };
  const removeFriend = async () => {
    const response = await axios.patch(
      `http://localhost:3000/users/${_id}/remove/${friendId}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(setFriends({ friends: response.data }));
  };
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {location}
          </Typography>
        </Box>
      </FlexBetween>
      {_id != friendId && (
        <IconButton
          onClick={isFriend ? () => removeFriend() : () => addFriend()}
          sx={{ backgroundColor: light, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: dark }} />
          ) : (
            <PersonAddOutlined sx={{ color: dark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
