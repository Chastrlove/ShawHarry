import * as React from "react";
import { observer } from "mobx-react";
import { HomPageStore } from "page/admin/homePage/HomPageStore";
import { InputItem } from "components/input";
import { Field } from "common/Field";

@observer
export class HomePageView extends React.Component<any> {
  public store: HomPageStore = new HomPageStore();
  protected field = new Field({
    value: undefined,
  });

  doAction = () => {
    this.store.changeTodo(123212223);
  };

  public render() {
    return <InputItem field={this.field} />;
  }
}

/*
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
}*/
