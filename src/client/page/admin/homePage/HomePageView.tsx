import * as React from "react";
import * as style from "./homeStyle.pcss";
import { observer } from "mobx-react";
import { HomPageStore } from "page/admin/homePage/HomPageStore";
import { ThemeContext } from "page/admin/App";
import { useEffect, useState } from "react";

 /*export class HomePageView extends React.Component<any> {
  static contextType = ThemeContext;
  public store: HomPageStore = new HomPageStore();

  public doAction = async () => {
    this.store.changeTodo(123);
  };
  public render() {
    const { todo } = this.store;
    return (
      <div className={style.love} onClick={this.doAction}>
        {`This is for shaw ${todo || this.context.theme}`}
      </div>
    );
  }
}*/

export const HomePageView=function(props) {
  const [width, setWidth] = useState(11211);

  useEffect(() => {
    const handleResize = ()=>{
      setWidth(window.innerWidth+101);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      //re-render完的时候调用，第一次进useEffect不调用
      window.removeEventListener('resize',()=>{});
    }
  });
  return (
    <p style={{color:'red'}}> window wid1th is {width}</p>
  )
}
