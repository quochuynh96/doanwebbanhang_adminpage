import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Dropdown, Input, Menu, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./EventsManagement.module.scss";
import { removeEvent } from "./../../Modules/actions/events.actions";

const TableEvents = ({ editEvent }) => {
  const events = useSelector((state) => state.events);
  const dataSource = [];
  const dispatch = useDispatch();

  const menu = (id) => (
    <Menu className="management-action">
      <Menu.Item onClick={() => editEvent(id)}>
        <EditOutlined />
        &ensp;&ensp;Sửa
      </Menu.Item>
      <Menu.Item onClick={() => dispatch(removeEvent(id))}>
        <DeleteOutlined />
        &ensp;&ensp;Xoá
      </Menu.Item>
    </Menu>
  );
  for (let i of events) {
    dataSource.push({
      key: i.id,
      title: i.title,
      image: <img src={i.image} height="100px" alt="" />,
      typeBanner: i.typeBanner,
      linkToWeb: <a href={i.linkToWeb}>{i.linkToWeb}</a>,
      orderIndex: i.orderIndex,
      created: i.created,
      status: i.status ? "Actived" : "Not activated",
      actions: (
        <Dropdown overlay={menu(i.id)} placement="bottomRight">
          <MoreOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
        </Dropdown>
      ),
    });
  }

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      className: styles.event_manager_table_table_col1,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      className: styles.event_manager_table_table_col2,
    },
    {
      title: "Loại banner",
      dataIndex: "typeBanner",
      key: "typeBanner",
      className: styles.event_manager_table_table_col3,
      align: "center",
    },
    {
      title: "Địa chỉ trang web",
      dataIndex: "linkToWeb",
      key: "linkToWeb",
      className: styles.event_manager_table_table_col4,
    },
    {
      title: "Số đặt hàng",
      dataIndex: "orderIndex",
      key: "orderIndex",
      className: styles.event_manager_table_table_col5,
      align: "center",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created",
      key: "created",
      className: styles.event_manager_table_table_col6,
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      className: styles.event_manager_table_table_col7,
      align: "center",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      className: styles.event_manager_table_table_col8,
      align: "right",
    },
  ];
  return (
    <>
      <div className={styles.event_manager_table_search}>
        <Input
          placeholder="Enter your username"
          prefix={<SearchOutlined />}
          size="large"
          style={{ borderRadius: "10px" }}
        />
      </div>
      <div className={styles.event_manager_table_table}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </>
  );
};

export default TableEvents;
