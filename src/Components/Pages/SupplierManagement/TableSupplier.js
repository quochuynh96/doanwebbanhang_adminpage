import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Dropdown, Input, Menu, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSupplier } from "../../Modules/actions/suppliers.actions";
import styles from "./SupplierManagement.module.scss";

const TableSupplier = ({ editSupplierHandle, getAll, setIsSpin, isSpin }) => {
  const suppliers = useSelector((state) => state.suppliers);
  const [searchValue, setSearchValue] = useState("");
  const [dataSupplier, setDataSupplier] = useState([]);

  const dispatch = useDispatch();

  const menu = (id) => (
    <Menu className="management-action">
      <Menu.Item key={1} onClick={() => editSupplierHandle(id)}>
        <EditOutlined />
        &ensp;&ensp;Sửa
      </Menu.Item>
      <Menu.Item key={2} onClick={() => dispatch(removeSupplier(id))}>
        <DeleteOutlined />
        &ensp;&ensp;Xoá
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (Array.isArray(suppliers)) {
      setDataSupplier(
        suppliers.filter((b) => b.name.toLowerCase().includes(searchValue))
      );
    } else {
      suppliers
        .then((resp) => {
          getAll().then((res) => {
            // eslint-disable-next-line no-unused-expressions
            isSpin
              ? message.success("Lưu hãng nhà phân phối thành công")
              : null;
            setIsSpin(false);
            setDataSupplier(res.data);
            console.log(res);
          });
        })
        .catch((error) => {
          setIsSpin(false);
          let messageErr = error.response.data.message;
          messageErr =
            messageErr.length > 100
              ? "Đã có lỗi xảy ra, vui lòng thử lại!"
              : messageErr;
          message.error(messageErr, 1.5);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suppliers, searchValue]);

  const dataSource = [];
  for (let i of dataSupplier) {
    dataSource.push({
      key: i.id,
      id: i.id,
      name: i.name,
      address: i.address,
      phoneNumber: i.phoneNumber,
      actions: (
        <Dropdown overlay={menu(i.id)} placement="bottomRight">
          <MoreOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
        </Dropdown>
      ),
    });
  }
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      className: styles.supplier_manager_table_table_col1,
      align: "center",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      className: styles.supplier_manager_table_table_col2,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      className: styles.supplier_manager_table_table_col3,
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      className: styles.supplier_manager_table_table_col4,
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "actions",
      key: "actions",
      className: styles.supplier_manager_table_table_col5,
      align: "center",
    },
  ];
  return (
    <>
      <div className={styles.supplier_manager_table_search}>
        <Input
          placeholder="Enter your username"
          prefix={<SearchOutlined />}
          size="large"
          style={{ borderRadius: "10px" }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className={styles.supplier_manager_table_table}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </>
  );
};

export default TableSupplier;
