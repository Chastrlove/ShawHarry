import { lazy } from "react";

export const routes = [
  {
    path: "/about",
    component: lazy(() => import("./homePage")),
  },
];
