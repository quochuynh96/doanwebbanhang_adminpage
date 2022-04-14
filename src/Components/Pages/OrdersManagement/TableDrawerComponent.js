import React from "react";
import { Table } from "antd";
import { MoneyFormat } from "../../Common/formatUtils";

const TableDrawerComponent = ({ items }) => {
  let data = [];
  const columns = [
    {
      title: "Hình",
      dataIndex: "image",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Tổng",
      dataIndex: "total",
    },
  ];

  items.forEach((item) => {
    data.push({
      key: "1",
      image: (
        <img
          src={
            item.image
              ? item.image
              : "https://tintuckhanhhoa.com/uploads/no_image_available.jpg"
          }
          alt=""
        />
      ),
      name: item.name,
      amount: item.amount,
      price: MoneyFormat(item.price),
      total: MoneyFormat(item.amount * item.price),
    });
  });

  return (
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      pagination={false}
    />
  );
};

export default TableDrawerComponent;
