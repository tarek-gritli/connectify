import { Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const { dark, main, medium } = palette.neutral;
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3000/assets/ad1.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Oat Milk</Typography>
        <Typography color={medium}>7lib.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Bakou 7lib bnin barcha ykhalik 9wey w kesa7 khater fih vitamine A
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
