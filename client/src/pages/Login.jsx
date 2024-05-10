import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "../components/Form";
import { useGetCustomPaletteColors } from "../hooks/useGetCustomPaletteColors";

const Login = () => {
  const { altBackground } = useGetCustomPaletteColors();
  const isNonMobileScreens = useMediaQuery("min-width: 1000px");

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={altBackground}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Connectify
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={altBackground}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Connectify: Building bridges, sparking conversations, and nurturing
          connections.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
