import * as React from "react";
import { Modal } from "antd";

export default class PageView1 extends React.Component<any> {
  public doAction = async () => {
    const a = [new Promise((resolve) => resolve(123)), 23, 4];
    for await (const p of a) {
      console.log(p);
    }
  };
  componentDidMount(): void {
    console.log(123);
  }

  public render() {
    return (
      <Modal visible={true}/>
    );
  }
}
