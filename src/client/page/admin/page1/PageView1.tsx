import * as React from "react";
import { Modal, Table } from "antd";
import { observer } from "mobx-react";

@observer
export default class PageView1 extends React.Component<any> {
  public doAction = async () => {
    const a = [new Promise((resolve) => resolve(123)), 23, 4];
    for await (const p of a) {
      console.log(p);
    }
  };
  componentDidMount(): void {
    console.log(12222223);
  }

  public render() {
    return (
      <>
        <TableClass />
      </>
    );
  }
}

@observer
class TableClass<T> extends Table<T> {}
