import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "@/theme";

import { router } from "@/router";

import "@/utils/localization/i18n";
import { LenisGSAPProvider } from "@/utils/providers/LenisGSAP";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LenisGSAPProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </LenisGSAPProvider>
    </ThemeProvider>
  </StrictMode>,
);
