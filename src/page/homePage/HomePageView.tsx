import * as React from "react";
import * as style from "./homeStyle.pcss";

export class HomePageView extends React.Component<any> {
  public doAction = async () => {
    const a = [new Promise((resolve) => resolve(123)), 23, 4];
    for await (const p of a) {
      console.log(p);
    }
  };
  public render() {
    return (
      <div className={style.love} onClick={this.doAction}>
        123
      </div>
    );
  }
}
