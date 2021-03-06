import { Button, Col, Form, Input, Modal, Row, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./SupplierManagement.module.scss";
import TableSupplier from "./TableSupplier";
import { useDispatch } from "react-redux";
import api from "../../Modules/api/contacts";
import {
  addSupplier,
  updateSupplier,
} from "../../Modules/actions/suppliers.actions";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;
const antIcon = (
  <LoadingOutlined
    style={{ fontSize: 18, marginRight: 10, fontWeight: "bold" }}
    spin
  />
);
const SupplierManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddSupplier, setIsAddSupplier] = useState(true);
  const [name, setName] = useState("");
  const [isSpin, setIsSpin] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [street, setStreet] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");

  const dispatch = useDispatch();

  const getAll = async () => {
    return await api.get("/suppliers");
  };

  const showModal = () => {
    setIsModalVisible(true);
    setIsAddSupplier(true);
  };

  const newSupplier = {
    name,
    address: {
      street,
      ward,
      district,
      city,
    },
    phoneNumber,
    email,
  };

  const resetForm = () => {
    setName("");
    setPhoneNumber("");
    setId("");
    setEmail("");
    setCity("");
    setStreet("");
    setWard("");
    setDistrict("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetForm();
    setIsChange(!isChange);
  };

  const addSupplierHandle = () => {
    if (newSupplier.name.length < 3) {
      return;
    }
    dispatch(addSupplier(newSupplier));
    handleCancel();
    setIsSpin(true);
  };
  const editSupplierHandle = (id) => {
    const supplier = suppliers.filter((p) => p.id === id);
    const address = supplier[0].address.split(",");
    setName(supplier[0].name);
    setCity(address[3]);
    setWard(address[1]);
    setDistrict(address[2]);
    setStreet(address[0]);
    setPhoneNumber(supplier[0].phoneNumber);
    setEmail(supplier[0].email);
    setId(supplier[0].id);
    showModal();
    setIsAddSupplier(false);
  };
  const updateSupplierHandle = () => {
    dispatch(updateSupplier(id, newSupplier));
    handleCancel();
    setIsSpin(true);
  };

  useEffect(() => {
    getAll().then((res) => {
      setSuppliers(res.data);
    });
  }, [isChange]);
  return (
    <div className={styles.supplier}>
      <div className={isSpin ? styles.supplier_overlay : ""}></div>
      <div className={styles.supplier_title}>
        <h1>Nh?? ph??n ph???i</h1>
        <div>
          <Button type="primary" size="large" onClick={showModal}>
            {isSpin && <Spin indicator={antIcon} style={{ color: "#fff" }} />}
            Th??m nh?? ph??n ph???i
          </Button>
        </div>
      </div>
      <div className={styles.supplier_manager}>
        <div className={styles.supplier_manager_table}>
          <TableSupplier
            editSupplierHandle={editSupplierHandle}
            getAll={getAll}
            setIsSpin={setIsSpin}
            isSpin={isSpin}
          />
        </div>
        <Modal
          title="Qu???n l?? nh?? ph??n ph???i"
          visible={isModalVisible}
          width={600}
          onCancel={handleCancel}
          footer={null}
          className={`categories_modal ${styles.categories_modal_handle}`}
        >
          <div className={styles.supplier_manager_handle}>
            <Form layout="vertical">
              <div className={styles.supplier_modal_handle_col}>
                <Form.Item label="T??n nh?? ph??n ph???i" required>
                  <Input
                    size="large"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="S??? ??i???n tho???i" required>
                  <Input
                    size="large"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="Email" required>
                  <Input
                    size="large"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Row gutter={60}>
                  <Col span={12}>
                    <Form.Item label="T???nh/th??nh ph???" required>
                      <Select
                        defaultValue="Ch???n t???nh/th??nh ph???"
                        onChange={(value) => setCity(value)}
                        size="large"
                        value={city}
                      >
                        <Option value={"H??? Ch?? Minh"}>H??? Ch?? Minh</Option>
                        <Option value={"?????ng Nai"}>?????ng Nai</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Qu???n/huy???n" required>
                      <Select
                        defaultValue="Ch???n qu???n/huy???n"
                        onChange={(value) => setDistrict(value)}
                        size="large"
                        value={district}
                      >
                        <Option value={"Qu???n 1"}>Qu???n 1</Option>
                        <Option value={"Qu???n 2"}>Qu???n 2</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Ph?????ng/x??" required>
                      <Select
                        defaultValue="Ch???n Ph?????ng/x??"
                        onChange={(value) => setWard(value)}
                        size="large"
                        value={ward}
                      >
                        <Option value={"Ph?????ng 10"}>Ph?????ng 10</Option>
                        <Option value={"Ph?????ng 15"}>Ph?????ng 15</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="???????ng" required>
                      <Input
                        size="large"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  {isAddSupplier && (
                    <Button
                      type="primary"
                      size="large"
                      onClick={addSupplierHandle}
                    >
                      Th??m
                    </Button>
                  )}
                  {!isAddSupplier && (
                    <Button
                      type="primary"
                      size="large"
                      onClick={updateSupplierHandle}
                    >
                      S???a
                    </Button>
                  )}

                  {isAddSupplier && (
                    <Button type="primary" size="large" onClick={resetForm}>
                      M???i
                    </Button>
                  )}
                </Form.Item>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SupplierManagement;
