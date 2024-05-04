import { Box } from "@mui/material";

const UserImage = ({ image, size = "50px" }) => {
  return (
    <Box
      width={size}
      height={size}
      sx={{ overflow: "hidden", borderRadius: "50%" }}
    >
      <img
        style={{ objectFit: "contain", width: "100%", height: "100%" }}
        alt="user"
        src={`http://localhost:3000/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
