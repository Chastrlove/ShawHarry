import * as React from "react";
import * as style from "./homeStyle.pcss";
import {observer} from 'mobx-react'
import { HomPageStore } from "page/admin/homePage/HomPageStore";

@observer
export class HomePageView extends React.Component<any> {
  public store:HomPageStore =new HomPageStore();

  public doAction = async () => {
    this.store.changeTodo(123);
  };
  public render() {
    const {todo} =this.store;
    return (
      <div className={style.love} onClick={this.doAction}>
        {`This is for shaw ${todo || ''}`}
      </div>
    );
  }
}
