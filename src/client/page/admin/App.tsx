import * as React from "react";
import { HashRouter as Router } from "react-router-dom";
import { routes } from "page/admin/routes";
import * as _ from "lodash";
import "./global.pcss";
import { AuthorizedRoute } from "components/authorizedRoute/AuthorizedRoute";

export const ThemeContext = React.createContext({
  theme: "light",
});

export class App extends React.Component<any> {
  render() {
    return (
      <Router>
        <React.Fragment>
          {_.map(routes, (route) => {
            return <AuthorizedRoute route={route} key={route.path}/>;
          })}
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
