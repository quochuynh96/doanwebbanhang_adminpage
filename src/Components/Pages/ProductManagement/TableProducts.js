import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { MoreOutlined } from "@ant-design/icons/lib/icons";
import { Dropdown, Input, Menu, message, Table } from "antd";
import styles from "./ProductManagement.module.scss";

import { removeAccents } from "../../Common/StringUtils";

import { MoneyFormat, NumberFormat } from "../../Common/formatUtils";
import axios from "axios";

const TableProducts = ({ editProduct }) => {
  const productsData = useSelector((state) => state.products);
  const [productsFilter, setProductsFilter] = useState([]);
  const [search, setSearch] = useState("");

  const onchangeSearch = (e) => {
    let keyword = e.target.value;
    setSearch(keyword);
    setProductsFilter(
      productsData.filter((b) =>
        removeAccents(b.name)
          .toLowerCase()
          .includes(removeAccents(keyword).toLowerCase())
      )
    );
  };

  const removeProduct = (id) => {
    axios.delete(
      `https://tech-store-44eac-default-rtdb.firebaseio.com/products/${id}.json`
    );
    message.loading(`Đang xoá hãng sản phẩm..`, 1);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const menu = (id) => {
    return (
      <Menu className="management-action">
        <Menu.Item onClick={() => editProduct(id)} key="1">
          <EditOutlined />
          &ensp;Sửa
        </Menu.Item>
        <Menu.Item onClick={() => removeProduct(id)} key="2">
          <DeleteOutlined />
          &ensp;Xoá
        </Menu.Item>
      </Menu>
    );
  };

  const dataSource = [];

  let numberRow = 1;
  productsFilter.forEach((product) => {
    dataSource.push({
      key: product.id,
      no: numberRow++,
      product: (
        <div className={styles.products_list_table_product}>
          <img src={product.image} alt="" />
          <div>{product.name}</div>
        </div>
      ),
      price: product.price,
      amount: product.inStock,
      category: product.category,
      brand: product.brand,
      action: (
        <div>
          <Dropdown overlay={menu(product.id)} placement="bottomRight">
            <MoreOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
          </Dropdown>
        </div>
      ),
    });
  });

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "no",
      key: "no",
      className: styles.products_list_table_table_col1,
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      className: styles.products_list_table_table_col2,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      className: styles.products_list_table_table_col3,
      align: "center",
    },
    {
      title: "Hãng",
      dataIndex: "brand",
      key: "brand",
      className: styles.products_list_table_table_col4,
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      className: styles.products_list_table_table_col5,
      align: "center",
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 3,
      },

      render: (text) => <>{MoneyFormat(text)}</>,
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
      className: styles.products_list_table_table_col6,
      align: "center",
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 3,
      },
      render: (text) => NumberFormat(text),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      className: styles.products_list_table_table_col7,
      align: "center",
    },
  ];

  useEffect(() => {
    setProductsFilter(productsData);
  }, [productsData]);

  return (
    <>
      <div className={styles.products_list_table_search}>
        <Input
          placeholder="Nhập từ khóa cần tìm..."
          prefix={<SearchOutlined />}
          size="large"
          style={{ borderRadius: "10px" }}
          value={search}
          onChange={onchangeSearch}
        />
      </div>
      <div className={styles.products_list_table_table}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 4 }}
          value={search}
          onChange={onchangeSearch}
        />
      </div>
    </>
  );
};

export default TableProducts;
