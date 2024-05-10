import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state/reducers/auth";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import axios from "axios";
import { useGetAuthenticationStatus } from "../hooks/useGetAuthenticationStatus";
import { useGetCustomPaletteColors } from "../hooks/useGetCustomPaletteColors";
const Friend = ({ friendId, name, userPicturePath, location }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { friends } = useSelector((state) => state.user);
  const { _id, token } = useGetAuthenticationStatus();
  const { primaryLight, primaryDark, neutralMedium, neutralMain } =
    useGetCustomPaletteColors();

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
            color={neutralMain}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={neutralMedium} fontSize="0.75rem">
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
