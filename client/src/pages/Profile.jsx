import { Box, useMediaQuery, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import FriendListWidget from "../components/FriendListWidget";
import MyPostWidget from "../components/MyPostWidget";
import PostsWidget from "../components/PostsWidget";
import UserWidget from "../components/UserWidget";
import axios from "axios";
import { setLogout } from "../state/reducers/auth";
import { useGetAuthenticationStatus } from "../hooks/useGetAuthenticationStatus";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedInUserId, token } = useGetAuthenticationStatus();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const deleteAccount = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/users/delete/${loggedInUserId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(setLogout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        console.log(response);
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);
  if (!user) return null;
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          {loggedInUserId === userId && (
            <Box mt="2rem" display="flex" justifyContent="center">
              <Button variant="contained" color="error" onClick={deleteAccount}>
                Delete Account
              </Button>
            </Box>
          )}
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
