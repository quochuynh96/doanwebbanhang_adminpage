import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import "./SideMenu.scss";

import {
  AppstoreOutlined,
  AreaChartOutlined,
  ContainerOutlined,
  DashboardOutlined,
  InboxOutlined,
  LayoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../Asserts/images/logo.png";

const { SubMenu } = Menu;

const SideMenu = () => {
  const [isLoading, setIsLoading] = useState(true);
  const partName = useLocation();

  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState("/dashboard");
  useEffect(() => {
    setDefaultSelectedKeys(partName.pathname);
  }, [partName]);

  setTimeout(() => {
    setIsLoading(false);
  }, 100);

  const menuItems = [
    {
      pathname: "/dashboard",
      icon: <DashboardOutlined style={{ fontSize: 16 }} />,
      name: "Dashboard",
    },
    // {
    //   pathname: "/event-management",
    //   icon: <PicCenterOutlined style={{ fontSize: 16 }} />,
    //   name: "Sự kiện",
    // },
    {
      key: 1,
      pathname: "divider",
    },
    {
      pathname: "/product-management",
      icon: <InboxOutlined style={{ fontSize: 16 }} />,
      name: "Sản phẩm",
    },
    {
      pathname: "/user-management",
      icon: <UserOutlined  style={{ fontSize: 16 }}/>,
      name: "Người dùng",
    },
    {
      pathname: "/brand-management",
      icon: <LayoutOutlined style={{ fontSize: 16 }} />,
      name: "Hãng sản xuất",
    },
    {
      pathname: "/category-management",
      icon: <AppstoreOutlined style={{ fontSize: 16 }} />,
      name: "Danh mục",
    },
    {
      key: 2,
      pathname: "divider",
    },
    {
      pathname: "/order-management",
      icon: <ContainerOutlined style={{ fontSize: 16 }} />,
      name: "Đơn hàng",
    },
    {
      pathname: "submenu",
      menuItem: [
        {
          pathName: "/statistical-management/rate",
          name: "Đánh giá",
        },
        {
          pathName: "/statistical-management/product",
          name: "Sản phẩm",
        },
        {
          pathName: "/statistical-management/turnover",
          name: "Doanh thu",
        },
        {
          key: 15,
          pathName: "/statistical-management/customer",
          name: "Khách hàng",
        },
      ],
    },
    // {
    //   key: 3,
    //   pathname: "divider",
    // },
    // {
    //   pathname: "/user-management",
    //   icon: <UserOutlined style={{ fontSize: "16px" }} />,
    //   name: "Tài khoản",
    // },
  ];

  return (
    <div className="sidemenu">
      <div>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <br />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="sidemenu_menu">
          <Menu
            theme="dark"
            style={{ backgroundColor: "rgb(44, 53, 83)" }}
            defaultSelectedKeys={[defaultSelectedKeys]}
            mode="inline"
          >
            {menuItems.map((item) => {
              if (item.pathname === "divider") {
                return (
                  <Menu.Divider
                    className="menu-divider"
                    key={item.key}
                  ></Menu.Divider>
                );
              } else if (item.pathname === "submenu") {
                return (
                  <SubMenu
                    key="sub1"
                    icon={<AreaChartOutlined style={{ fontSize: "16px" }} />}
                    title="Thống kê"
                    className="submenu"
                  >
                    {item.menuItem.map((m) => (
                      <Menu.Item key={m.pathName}>
                        <Link to={m.pathName}>{m.name}</Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={item.pathname}>
                    <Link to={item.pathname}>
                      {item.icon} {item.name}
                    </Link>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </div>
      )}
    </div>
  );
};

export default SideMenu;
