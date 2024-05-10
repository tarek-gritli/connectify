import { Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { useGetCustomPaletteColors } from "../hooks/useGetCustomPaletteColors";

const AdvertWidget = () => {
  const { neutralDark, neutralMain, neutralMedium } =
    useGetCustomPaletteColors();
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={neutralDark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={neutralMedium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3000/assets/ad1.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={neutralMain}>Oat Milk</Typography>
        <Typography color={neutralMedium}>7lib.com</Typography>
      </FlexBetween>
      <Typography color={neutralMedium} m="0.5rem 0">
        Bakou 7lib bnin barcha ykhalik 9wey w kesa7 khater fih vitamine A
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
