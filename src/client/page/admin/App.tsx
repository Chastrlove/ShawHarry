import * as React from "react";
import { AppStore } from "page/admin/AppStore";

export class App extends React.Component<any> {
  public store = new AppStore();

  public componentDidMount(): void {
    this.store.getValue();
  }

  public render() {
    return "1121aaa3223";
  }
}

export default App;
