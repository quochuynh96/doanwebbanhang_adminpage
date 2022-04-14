import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderPage from "../Layout/Header/Header";
import pages from "./Pages";
import { Layout } from "antd";
import SideMenu from "./../Layout/SideMenu/SideMenu";

const { Header, Sider, Content } = Layout;

const ERouter = (props) => {
  return (
    <Layout style={{ height: "100vh" }}>
      <BrowserRouter>
        <Sider width={250} style={{ backgroundColor: "rgb(44, 53, 83)" }}>
          <SideMenu />
        </Sider>
        <Layout style={{ overflow: "auto" }}>
          <Header
            style={{
              backgroundColor: "#fff",
              boxShadow: " 0 .15rem 1.75rem 0 rgba(58,59,69,.15)",
            }}
          >
            <HeaderPage logoutHandle={props.logoutHandle} />
          </Header>
          <Content>
            <div
              style={{
                padding: "30px",
                minHeight: "100%",
              }}
            >
              <Routes>
                {pages.map((item) => {
                  return (
                    <Route
                      key={item.path}
                      exact={item.exact}
                      path={item.path}
                      element={item.element}
                    />
                  );
                })}
              </Routes>
            </div>
          </Content>
        </Layout>
      </BrowserRouter>
    </Layout>
  );
};

export default ERouter;
