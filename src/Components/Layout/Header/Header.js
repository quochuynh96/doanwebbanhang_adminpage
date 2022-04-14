import React from "react";
import { Dropdown, Menu } from "antd";
import styles from "./Header.module.scss";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";

import { Link } from "react-router-dom";
import avatar from "../../../Asserts/images/avartar.jpg";

const Header = (props) => {
  const menu = (
    <Menu className={styles.header_account_menu}>
      <Menu.Item>
        <Link to="/profile">
          <FaUserAlt className={styles.header_account_menu_icon} />
          Hồ sơ
        </Link>
      </Menu.Item>
      <Menu.Item>
        <div onClick={props.logoutHandle}>
          <FaSignOutAlt className={styles.header_account_menu_icon} />
          Đăng xuất
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.header}>
      <div className={styles.header_search}></div>
      <div className={styles.header_account}>
        <div>
          <p>Võ Đức Huy</p>
        </div>
        <div>
          <Dropdown overlay={menu} placement="bottomRight">
            <img src={avatar} alt="" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
