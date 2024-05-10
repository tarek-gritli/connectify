import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAuthenticationStatus } from "../hooks/useGetAuthenticationStatus";
import axios from "axios";
import { useGetCustomPaletteColors } from "../hooks/useGetCustomPaletteColors";

const UserWidget = ({ picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { _id, token } = useGetAuthenticationStatus();
  const { neutralDark, neutralMedium, neutralMain, primaryLight } =
    useGetCustomPaletteColors();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/users/${_id}`, {
          headers: {
            authorization: token,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);
  if (!user) {
    return null;
  }
  const {
    firstName,
    lastName,
    location,
    occupation,
    profileViews,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${_id}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={neutralDark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={neutralMedium}>
              {friends.length} friends
            </Typography>
          </Box>
        </FlexBetween>
        <IconButton>
          <ManageAccountsOutlined />
        </IconButton>
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: neutralMain }} />
          <Typography color={neutralMedium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: neutralMain }} />
          <Typography color={neutralMedium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={neutralMedium}>Profile Views</Typography>
          <Typography color={neutralMain} fontWeight="500">
            {profileViews}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={neutralMedium}>
            Impressions of your post
          </Typography>
          <Typography color={neutralMain} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Typography
          fontSize="1rem"
          color={neutralMain}
          fontWeight="500"
          mb="1rem"
        >
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={neutralMain} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={neutralMedium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: neutralMain }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={neutralMain} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={neutralMedium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: neutralMain }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
