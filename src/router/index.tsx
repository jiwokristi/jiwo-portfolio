import { createBrowserRouter } from "react-router-dom";

import { Home } from "@/pages/home";
import { RootLayout } from "@/pages/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);
