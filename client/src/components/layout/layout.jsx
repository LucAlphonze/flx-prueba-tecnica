import { Layout, Breadcrumb } from "antd";
import React from "react";
import flexxusHeader from "../../assets/logo-flexxus-header.png";
import logo from "../../logo.svg";
import Tabla from "../tabla/tabla";
const { Header, Content, Footer } = Layout;

const LayoutComponent = () => {
  return (
    <Layout className="layout">
      <Header
        style={{
          top: 0,
          zIndex: 1,
          width: "100%",
          background: "#D9D9D9",
        }}
      >
        <img src={flexxusHeader} alt={logo} />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[
            {
              title: "Usuarios",
            },
            {
              title: "Listado de Usuarios",
            },
          ]}
        />
        <div className="site-layout-content">
          <Tabla key={"tabla.component"}></Tabla>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <p>Flexxus Desafio Técnico - Lucas Alfonzo</p>
        <p>Ant Design ©2018 Created byAnt UED</p>
      </Footer>
    </Layout>
  );
};

export default LayoutComponent;
