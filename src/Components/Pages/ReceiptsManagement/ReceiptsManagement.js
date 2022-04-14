import { Col, Form, Input, Row, Select, Switch } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./ReceiptsManagement.module.scss";
import SelectSearch from "./../../Common/SelectSearch/SelectSearch";

const { Option } = Select;
const ReceiptManagement = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [toggleNamePrd, setToggleNamePrd] = useState(false);

  const brands = useSelector((state) => state.brands);
  const products = useSelector((state) => state.products);
  console.log(products);
  function onChange(checked) {
    setToggleNamePrd(checked);
  }
  console.log(name);
  return (
    <div className={styles.receipt}>
      <div className={styles.receipt_title}>
        <h1>Hoá đơn nhập</h1>
      </div>
      <div className={styles.receipt_manager}>
        <Form layout="vertical">
          <Row gutter={50}>
            <Col span={8}>
              <Form.Item label="Nhà cung cấp">
                <Select
                  defaultValue="Chọn nhà cung cấp"
                  onChange={(value) => setBrand(value)}
                  size="large"
                >
                  {brands.map((item) => (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Nhà cung cấp">
                <Input value={"Không anh chứ ai!"} size="large" />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Tên sản phẩm">
                <div className={styles.receipt_name}>
                  {toggleNamePrd && (
                    <Input
                      value={name}
                      size="large"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập tên sản phẩm"
                    />
                  )}

                  {!toggleNamePrd && (
                    <SelectSearch
                      setValue={setName}
                      placeholder="Chọn sản phẩm"
                    >
                      {products.map((item) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </SelectSearch>
                  )}
                  <Switch onChange={onChange} />
                </div>
              </Form.Item>
              <Form.Item label="Màu sắc">
                <div>
                  <SelectSearch setValue={setName} placeholder="Chọn sản phẩm">
                    {products.map((item) => (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </SelectSearch>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ReceiptManagement;
