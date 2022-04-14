import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { DeleteOutlined, EditOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Input, Menu, Table } from "antd";
import styles from "./BrandsManagement.module.scss";

import { removeAccents } from "../../Common/StringUtils";

const TableBrands = ({ editBrand, removeBrand }) => {
  const brandsData = useSelector((state) => state.brands);
  const [brandsFilter, setBrandsFilter] = useState([]);
  const [search, setSearch] = useState("");

  const onchangeSearch = (e) => {
    let keyword = e.target.value;
    setSearch(keyword);
    console.log(keyword);

    setBrandsFilter(
      brandsData.filter((b) =>
        removeAccents(b.name)
          .toLowerCase()
          .includes(removeAccents(keyword).toLowerCase())
      )
    );
  };

  const menu = (id) => (
    <Menu className="management-action">
      <Menu.Item onClick={() => editBrand(id)} key="1">
        <EditOutlined />
        &ensp;&ensp;Sửa
      </Menu.Item>
      <Menu.Item onClick={() => removeBrand(id)} key="2">
        <DeleteOutlined />
        &ensp;&ensp;Xoá
      </Menu.Item>
    </Menu>
  );

  const dataSource = [];

  let numberRow = 1;
  brandsFilter.forEach((brand) => {
    dataSource.push({
      key: brand.id,
      no: numberRow++,
      id: brand.id,
      name: brand.name,
      image: <img src={brand.image ? brand.image : 'https://tintuckhanhhoa.com/uploads/no_image_available.jpg'} style={{backgroundSize: 'cover'}} width="128" alt={brand.image} />,
      actions: (
        <Dropdown overlay={menu(brand.id)} placement="bottomRight">
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
      className: styles.brand_manager_table_table_col1,
      align: "center",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      className: styles.brand_manager_table_table_col2,
    },
    {
      title: "Logo",
      dataIndex: "image",
      key: "image",
      className: styles.brand_manager_table_table_col4,
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "actions",
      key: "actions",
      className: styles.brand_manager_table_table_col5,
      align: "center",
    },
  ];

  useEffect(() => {
    setBrandsFilter(brandsData);
  }, [brandsData]);

  return (
    <>
      <div className={styles.brand_manager_table_search}>
        <Input
          placeholder="Nhập từ khóa mà bạn muốn tìm..."
          prefix={<SearchOutlined />}
          size="large"
          style={{ borderRadius: "10px" }}
          id="myInput"
          value={search}
          onChange={onchangeSearch}
        />
      </div>
      <div className={styles.brand_manager_table_table}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 4 }}
          id="myTable"
        />
      </div>
    </>
  );
};

export default TableBrands;
