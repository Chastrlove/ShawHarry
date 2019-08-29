import { lazy } from "react";
import { AuthorizedRouteProps } from "components/authorizedRoute/AuthorizedRoute";

export const routes: Array<AuthorizedRouteProps> = [
  {
    path: "/",
    component: lazy(() => import("components/layout/layoutBasic")),
    routes: [
      {
        path: "/dashboard",
        component: lazy(() => import("page/admin/homePage")),
      },
      {
        path: "/form",
        component: lazy(() => import("page/admin/form")),
      },
    ],
  },
];
