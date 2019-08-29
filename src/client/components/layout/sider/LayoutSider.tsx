import * as React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import * as styles from "components/layout/sider/LayoutSider.pcss";

const { Header, Content, Footer, Sider } = Layout;

export class LayoutSider extends React.Component<any> {
  public render() {
    return (
      <Sider width={256} className={styles.side}>
        <div className={styles.logo} id="logo">
          <Link to="/">
            <h1>Ant Design Pro</h1>
          </Link>
        </div>
      </Sider>
    );
  }
}
