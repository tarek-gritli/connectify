import { useTheme } from "@mui/material";
export const useGetCustomPaletteColors = () => {
  const { palette } = useTheme();
  return {
    neutralDark: palette.neutral.dark,
    neutralMain: palette.neutral.main,
    neutralMedium: palette.neutral.medium,
    neutralLight: palette.neutral.light,
    neutralMediumMain: palette.neutral.mediumMain,
    primaryMain: palette.primary.main,
    primaryLight: palette.primary.light,
    primaryDark: palette.primary.dark,
    altBackground: palette.background.alt,
    background: palette.background.default,
    mode: palette.mode,
  };
};
