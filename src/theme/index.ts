import { createTheme } from "@mui/material";

import { commonColors } from "./colors";
import { typographyOverrides } from "./overrides/typography";
import { cssBaselineOverrides } from "./overrides/CssBaseline";

export const theme = createTheme({
  palette: {
    common: commonColors,
  },
  typography: typographyOverrides,
  components: {
    ...cssBaselineOverrides,
  },
});
