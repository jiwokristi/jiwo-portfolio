import { ThemeOptions } from "@mui/material";

export const typographyOverrides: ThemeOptions["typography"] = palette => ({
  fontFamily: "Poppins, sans-serif",
  fontWeightBold: 700,
  allVariants: {
    color: palette.common.black,
  },
  h1: {
    fontWeight: 500,
    fontSize: "17rem",
  },
  h2: {
    fontWeight: 500,
    fontSize: "6.4rem",
  },
  subtitle1: {
    fontWeight: 500,
    fontSize: "2rem",
  },
});
