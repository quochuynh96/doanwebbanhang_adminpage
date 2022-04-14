import { DeleteOutlined, EditOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Input, Menu, Table } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./CategoryManagement.module.scss";
import { useSelector } from "react-redux";
import { removeAccents } from "../../Common/StringUtils";

const TableCategories = ({
  editCategory,
  removeCategory
}) => {
  const [search, setSearch] = useState("");
  const categoriesData = useSelector((state) => state.categories);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const dataSource = [];

  const onchangeSearch = (e) => {
    let keyword = e.target.value;
    setSearch(keyword);
    setCategoriesFilter(
      categoriesData.filter((c) =>
        removeAccents(c.name)
          .toLowerCase()
          .includes(removeAccents(keyword).toLowerCase())
      )
    );
  };

  const menu = (id) => (
    <Menu className="management-action">
      <Menu.Item key={1} onClick={() => editCategory(id)}>
        <EditOutlined />
        &ensp;&ensp;Sửa
      </Menu.Item>
      <Menu.Item key={2} onClick={() => removeCategory(id)}>
        <DeleteOutlined />
        &ensp;&ensp;Xoá
      </Menu.Item>
    </Menu>
  );

  let numberRow = 1;
  categoriesFilter.forEach((category) => {
    dataSource.push({
      key: category.id,
      no: numberRow++,
      id: category.id,
      name: category.name,
      slug: category.slug,
      actions: (
        <Dropdown overlay={menu(category.id)} placement="bottomRight">
          <MoreOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
        </Dropdown>
      ),
    });
  });

  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "no",
      key: "no",
      className: styles.category_manager_table_table_col1,
      align: "center"
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      className: styles.category_manager_table_table_col2,
    },
    {
      title: "Tên đại diện",
      dataIndex: "slug",
      key: "slug",
      className: styles.category_manager_table_table_col3,
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "actions",
      key: "actions",
      className: styles.category_manager_table_table_col5,
      align: "center",
    },
  ];

  useEffect(() => {
    setCategoriesFilter(categoriesData);
  }, [categoriesData]);

  return (
    <>
      <div className={styles.category_manager_table_search}>
        <Input
          placeholder="Nhập từ khóa bạn muốn tìm..."
          prefix={<SearchOutlined />}
          size="large"
          value={search}
          style={{ borderRadius: "10px" }}
          onChange={(e) => onchangeSearch(e)}
        />
      </div>
      <div className={styles.category_manager_table_table}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 4 }}
        />
      </div>
    </>
  );
};

export default TableCategories;
