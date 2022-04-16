import {
  SearchOutlined,
} from "@ant-design/icons";
import {
  Input,
  Table,
  Button,
  Popconfirm,
} from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./UsersManagement.module.scss";

import { removeAccents } from "../../Common/StringUtils";
import {url} from "../../../App";

const TableUsers = ({ updateUser, getAllUsers }) => {
  const usersData = useSelector((state) => state.users);
  const [usersFilter, setUsersFilter] = useState([]);
  const [search, setSearch] = useState("");

  const onchangeSearch = (e) => {
    let keyword = e.target.value;
    setSearch(keyword);
    setUsersFilter(
      usersData.filter((u) =>
        removeAccents(u.fullName + u.username + u.phoneNumber + u.emai + u.address)
          .toLowerCase()
          .includes(removeAccents(keyword).toLowerCase())
      )
    );
  };

  const onConfirmChangeActive = (user) => {
    user.active = !user.active;
    setTimeout(() => {
      updateUser(user);
    }, 1000);

    setTimeout(() => {
      getAllUsers();
    }, 2000);

    return new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
  };

  const dataSource = [];

  usersFilter.forEach((user) => {
    dataSource.push({
      key: user.id,
      avatar: <img src={user.avatar ? user.avatar : 'https://tintuckhanhhoa.com/uploads/no_image_available.jpg'} alt="" />,
      username: user.username,
      fullname: user.fullName,
      gender: user.gender ? "nam" : "nữ",
      birthday: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      email: user.email,
      address: user.address,
      role: user.role,
      totalBought: user.totalBought,
      active: (
        <Popconfirm
          title={
            user.active
              ? "Bạn muốn ngưng hoạt động người dùng này?"
              : "Bạn muốn kích hoạt hoạt động người dùng này?"
          }
          onConfirm={() => onConfirmChangeActive(user)}
        >
          <Button type={user.active ? "danger": "primary"}>
            {user.active ? "Vô hiệu hóa người dùng" : "Kích hoạt người dùng"}
          </Button>
        </Popconfirm>
      ),
    });
  });

  const columns = [
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      className: styles.user_manager_table_col0,
      align: "center",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "username",
      className: styles.user_manager_table_col1,
    },

    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
      className: styles.user_manager_table_col2,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      className: styles.user_manager_table_col3,
      align: "center",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      className: styles.user_manager_table_col4,
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      className: styles.user_manager_table_col5,
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: styles.user_manager_table_col6,
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      className: styles.user_manager_table_col7,
      align: "center",
    },
    {
      title: "Đã mua (VNĐ)",
      dataIndex: "totalBought",
      key: "totalBought",
      className: styles.user_manager_table_col8,
      align: "center",
    },
    {
      title: "Kích hoạt",
      dataIndex: "active",
      key: "active",
      className: styles.user_manager_table_col9,
      align: "center",
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    //   className: styles.user_manager_table_col10,
    //   align: "center",
    // },
  ];

  useEffect(() => {
    let orderData = [];
    fetch(url + "/orders.json")
        .then((res) => {
          return res.json();
        })
        .then((dataResponse) => {
          let data = [];
          for (let key in dataResponse) {
            data.push({ id: key, ...dataResponse[key] });
          }
          data
              .sort(function (a, b) {
                return a.createdDate - b.createdDate;
              })
              .reverse();
          orderData = data;

          const collectedUser = {};
          usersData.forEach((user) => {
            collectedUser[user.phoneNumber] = 0;
          });
          orderData.forEach((order) => {
            collectedUser[order.user.phoneNumber] = collectedUser[order.user.phoneNumber] + order.totalPrice;
          })

          setUsersFilter(usersData.map((user) => ({
            ...user,
            totalBought: collectedUser[user.phoneNumber]
          })));
        });
  }, [usersData]);

  return (
    <>
      <div className={styles.user_manager_search}>
        <Input
          placeholder="Nhập từ khóa cần tìm kiếm"
          prefix={<SearchOutlined />}
          size="large"
          style={{ borderRadius: "10px" }}
          value={search}
          onChange={(e) => onchangeSearch(e)}
        />
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default TableUsers;
