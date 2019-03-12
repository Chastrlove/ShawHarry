import * as React from "react";
import { Route, RouteComponentProps } from "react-router";
import { LazyExoticComponent, ReactElement, Suspense } from "react";

export interface AuthorizedRouteProps {
  path: string;
  component: LazyExoticComponent<any>;
  exact?: boolean;
  routes?: Array<AuthorizedRouteProps>;
}

export class AuthorizedRoute extends React.Component<{ route: AuthorizedRouteProps }> {
  public hasPermission = (path): Boolean => {
    return true;
  };
  public render() {
    const { route } = this.props;

    return (
      this.hasPermission(route.path) && (
        <Route
          key={route.path}
          exact={route.exact}
          path={route.path}
          render={(props) => (
            <Suspense fallback={null}>
              <route.component {...props} routes={route.routes} />
            </Suspense>
          )}
        />
      )
    );
  }
}
