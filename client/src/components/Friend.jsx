import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state/reducers/auth";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import axios from "axios";
const Friend = ({ friendId, name, userPicturePath, location }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, friends } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
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
    const friends = response.data;
    dispatch(setFriends({ friends }));
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
    const friends = response.data;
    dispatch(setFriends({ friends }));
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
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
