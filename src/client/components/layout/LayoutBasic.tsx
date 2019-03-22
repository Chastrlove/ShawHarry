import * as React from "react";
import { Layout } from "antd";
import { LayoutSider } from "components/layout/sider/LayoutSider";
import * as styles from "components/layout/LayoutBasicStyle.pcss";
import { AuthorizedRoute } from "components/authorizedRoute/AuthorizedRoute";

const { Header, Content, Footer, Sider } = Layout;

export default class layoutBasicView extends React.Component<any> {
  public render() {
    const { routes } = this.props;
    return (
      <Layout className={styles.layoutWrap}>
        <LayoutSider />
        <Layout>
          <Header />
          <Content>
            {routes.map((route, key) => {
              return <AuthorizedRoute route={route} key={route.path}/>
            })}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}
