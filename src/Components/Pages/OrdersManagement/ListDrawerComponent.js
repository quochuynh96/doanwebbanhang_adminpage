import React from "react";
import { List } from "antd";

const ListDrawerComponent = ({ order }) => {
  console.log(order);
  let dataSource = [
    `Họ và tên:  ${order.user.name}`,
    `Số điện thoại: ${order.user.phoneNumber}`,
    `Email: ${order.user.email}`,
    `Địa Chỉ: ${order.user.address}`,
    // `Ngày Nhận: ${order.orderItems.receiveDate}`,
    // `Ngày Giao: ${order.orderItems.shippingDate}`,
    `Trạng Thái: ${order.orderItems.status}`,
    `Tổng Giá: ${order.orderItems.total}`,
    // `Ngày Tạo: ${order.o2.createdDate}`,
    // `ID: ${order.o2.id}`,
    // `Ngày Nhận Cuối Cùng: ${order.o2.lastReceiveDate}`,
    //
  ];

  return (
    <List
      size="large"
      bordered
      dataSource={dataSource}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  );
};

export default ListDrawerComponent;
