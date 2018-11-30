import * as React from "react";
import { Suspense } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { routes } from "page/admin/routes";
import * as _ from "lodash";

class App extends React.Component<any> {
  render() {
    return (
      <Router>
        <div>
          {_.map(routes, (routeItem) => {
            return (
              <Route
                key={routeItem.path}
                path={routeItem.path}
                render={(props) => (
                  <Suspense fallback={null}>
                    <routeItem.component {...props} />
                  </Suspense>
                )}
              />
            );
          })}
        </div>
      </Router>
    );
  }
}

export default App;
