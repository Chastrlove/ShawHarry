import * as React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
import * as styles from "components/layout/sider/LayoutSider.pcss";
import logo from 'assets/logo.svg'

export  class LayoutSider extends React.Component<any> {
  public render() {
    return (
        <Sider width={256} className={styles.side}>
          <div className={styles.logo} id="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
              <h1>Ant Design Pro</h1>
            </Link>
          </div>
        </Sider>

    );
  }
}
