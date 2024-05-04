import { Box } from "@mui/material";

const UserImage = ({ image, size = "40px" }) => {
  return (
    <Box width={size - 20} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3000/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;