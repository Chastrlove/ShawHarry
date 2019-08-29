import * as React from "react";
import "./global.pcss";
import { observer } from "mobx-react";

import { AppStore } from "./AppStore";
import { HomePageView } from "page/admin/homePage/HomePageView";

export const ThemeContext = React.createContext({
  theme: "light",
});

@observer
export class App extends React.Component<any> {
  public store = new AppStore();

  public componentDidMount(): void {
    this.store.getValue();
  }

  public componentWillMount(): void {}

  public render() {
    return <HomePageView />;
  }
}

export default App;
