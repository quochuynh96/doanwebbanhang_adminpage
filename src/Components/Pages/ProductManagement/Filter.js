import { Checkbox, Divider, Radio, Space } from "antd";
import React from "react";
import styles from "./ProductManagement.module.scss";
const Filter = (props) => {
  const { categories, brands, onChange, valuePrice } = props;
  return (
    <>
      <div className={styles.products_list_sortby_price}>
        <p className={styles.products_list_sortby_price_title}>Giá</p>
        <Radio.Group onChange={onChange} value={valuePrice}>
          <Space direction="vertical">
            <Radio value={1}>Dưới 100.000 </Radio>
            <Radio value={2}>100.000 - 1.000.000</Radio>
            <Radio value={3}>1.000.000 - 5.000.000</Radio>
            <Radio value={4}>5.000.000 - 10.000.000</Radio>
            <Radio value={5}>Trên 10.000.000</Radio>
          </Space>
        </Radio.Group>
      </div>
      <Divider />
      <div className={styles.products_list_sortby_category}>
        <p className={styles.products_list_sortby_category_title}>
          Danh sản phẩm
        </p>
        <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
          {categories.map((category, index) => (
            <p key={index}>
              <Checkbox value={category.value}>{category.name}</Checkbox>
            </p>
          ))}
        </Checkbox.Group>
      </div>
      <Divider />
      <div className={styles.products_list_sortby_brand}>
        <p className={styles.products_list_sortby_brand_title}>Thương hiệu</p>
        <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
          {brands.map((brand, index) => (
            <p key={index}>
              <Checkbox value={brand.value}>{brand.name}</Checkbox>
            </p>
          ))}
        </Checkbox.Group>
      </div>
    </>
  );
};

export default Filter;
