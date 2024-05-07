import { useTheme } from "@emotion/react";
import { Box, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMode } from "../state/reducers/auth";
import { DarkMode, LightMode } from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";

const NotFound = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <FlexBetween>
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            <Link to="/">Connectify</Link>
          </Typography>
          <IconButton
            onClick={() => dispatch(setMode())}
            sx={{ fontSize: "25px" }}
          >
            {palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode
                sx={{ color: palette.neutral.dark, fontSize: "25px" }}
              />
            )}
          </IconButton>
        </FlexBetween>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        minHeight="60vh"
      >
        <img
          src="src/assets/404.png"
          alt="Page not found"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
          }}
        />
        <Typography variant="h4" color={palette.neutral.main} mt={2} mb={2}>
          Oops! The page you are looking for could not be found.
        </Typography>
        <Link to="/">
          <Typography
            variant="h6"
            color={palette.primary.main}
            className="underline"
          >
            Go back to the homepage
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default NotFound;
