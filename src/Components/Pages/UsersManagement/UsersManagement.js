import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
} from "antd";

import React, { useEffect, useState } from "react";
import styles from "./UsersManagement.module.scss";
import "./UsersManagement.scss";
import { useDispatch } from "react-redux";
import {  getAllUsers, updateUser } from "../../Modules/actions/users.actions";
import TableUsers from "./TableUsers";

const UsersManagement = () => {

  const dispatch = useDispatch();

  const updateUserHandle = (values) => {
    dispatch(updateUser(values.id, values));
    
  };
  
  return (
    <div className={styles.user}>
      <div className={styles.user_title}>
        <div>
          <h1>Tài khoản</h1>
        </div>
        <div>
          {/* <Button type="primary" size="large" onClick={showModal}>
            Thêm tài khoản
          </Button> */}
        </div>
      </div>
      <div className={styles.user_manager}>
        <div className={styles.user_manager_table}>
          <TableUsers
            updateUser={updateUserHandle}
            getAllUsers= {() => dispatch(getAllUsers())}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
