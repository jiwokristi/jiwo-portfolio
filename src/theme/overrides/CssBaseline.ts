import { darken, ThemeOptions } from "@mui/material";

export const cssBaselineOverrides: ThemeOptions["components"] = {
  MuiCssBaseline: {
    styleOverrides: ({ palette }) => ({
      html: {
        fontSize: "62.5%",
      },
      body: {
        backgroundColor: palette.common.white,
        color: palette.grey["900"],
        userSelect: "none",

        "::-webkit-scrollbar": {
          width: "0.8rem",
          height: "0.8rem",
        },
        "::-webkit-scrollbar-track": {
          backgroundColor: palette.common.black,
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: palette.common.white,
          borderRadius: "0.8rem",

          ":hover": {
            backgroundColor: darken(palette.common.white, 0.1),
          },
        },
      },
    }),
  },
};
