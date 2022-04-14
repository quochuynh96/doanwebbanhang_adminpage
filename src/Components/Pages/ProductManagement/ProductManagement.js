import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import React, { useState } from "react";

import styles from "./ProductManagement.module.scss";
import TableProducts from "./TableProducts";

import { useSelector } from "react-redux";
import { storage } from "../../../firebase";
import { sleep } from "../../Common/sleep";
import { generateSlug } from "../../Common/StringUtils";
import { EditOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Upload } from "./../../Common/Upload/Upload";

const { Option } = Select;
const ProductManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const productsData = useSelector((state) => state.products);
  const categoriesData = useSelector((state) => state.categories);
  const brandsData = useSelector((state) => state.brands);

  const [isUpdate, setIsUpdate] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [isUpload, setIsUpload] = useState(true);
  const [profileImg, setProfileImg] = useState("");
  const [id, setId] = useState();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const editProduct = (id) => {
    const d = productsData.find((item) => item.id === id);
    form.setFieldsValue(d);

    setIsUpload(false);
    setProfileImg(d.image);
    setIsModalVisible(true);
    setIsUpdate(true);
    setId(d.id);
  };
  const [form] = Form.useForm();

  let urlImageWasUpload = "";
  const addProductHandle = async (values) => {
    uploadImageHandler();

    message.loading("Đang xử lý...", 5);
    await sleep(5000);
    const data = {
      ...values,
      createdDate: new Date(),
      image: urlImageWasUpload,
      slug: generateSlug(values.name),
    };

    fetch(
      "https://tech-store-44eac-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    window.location.reload();
  };

  const resetForm = () => {
    form.resetFields();
    setImageFile("");
  };
  const updateProductHandle = async (values) => {
    uploadImageHandler();

    message.loading("Đang xử lý...", 5);
    await sleep(5000);
    const data = {
      ...values,
      createdDate: new Date(),
      image: urlImageWasUpload,
      slug: generateSlug(values.name),
    };

    fetch(
      `https://tech-store-44eac-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    window.location.reload();
  };
  const uploadImageHandler = () => {
    let nameImage = "image" + new Date();
    const uploadTask = storage.ref(`images/${nameImage}`).put(imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(nameImage)
          .getDownloadURL()
          .then((url) => {
            urlImageWasUpload = url;
          });
      }
    );
  };

  const handleCancel = () => {
    resetForm();
    setIsUpdate(false);
    setIsModalVisible(false);
  };

  return (
    <div className={styles.products}>
      <div className={styles.products_title}>
        <h1>Sản phẩm</h1>

        <Button type="primary" size="large" onClick={showModal}>
          Thêm sản phẩm
        </Button>
      </div>
      <div>
        <Modal
          title="Quản lý sự kiện"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={"75%"}
          style={{ marginTop: "-90px" }}
          className={`events_modal ${styles.events_modal_handle}`}
        >
          <div className={styles.product_handle}>
            <div className={styles.product_handle_modal}>
              <Form
                layout="vertical"
                form={form}
                onFinish={!isUpdate ? addProductHandle : updateProductHandle}
              >
                <Row gutter={30}>
                  <Col span={15}>
                    <div className={styles.products_modal_handle_col}>
                      <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[
                          { required: true, message: "Nhập tên sản phẩm!" },
                        ]}
                      >
                        <Input size="large" />
                      </Form.Item>
                      <Form.Item
                        label="Giá sản phẩm"
                        name="price"
                        rules={[
                          { required: true, message: "Nhập giá sản phẩm!" },
                        ]}
                      >
                        <InputNumber
                          min={0}
                          size="large"
                          style={{
                            width: "100%",
                            borderRadius: 10,
                            overflow: "hidden",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Giảm giá"
                        name="discount"
                        rules={[
                          {
                            required: true,
                            message: "Nhập giảm giá sản phẩm!",
                          },
                        ]}
                      >
                        <InputNumber
                          min={0}
                          size="large"
                          style={{
                            width: "100%",
                            borderRadius: 10,
                            overflow: "hidden",
                          }}
                        />
                      </Form.Item>

                      <Form.Item label="Số lượng" name="inStock">
                        <InputNumber
                          min={0}
                          size="large"
                          style={{
                            width: "100%",
                            borderRadius: 10,
                            overflow: "hidden",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Danh mục"
                        name="category"
                        rules={[
                          {
                            required: true,
                            message: "Chọn danh mục sản phẩm!",
                          },
                        ]}
                      >
                        <Select
                          size="large"
                          style={{ width: "100%" }}
                          placeholder="Vui lòng chọn danh mục"
                        >
                          {categoriesData.map((item) => (
                            <Option key={item.id} value={item.slug}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label="Hãng"
                        name="brand"
                        rules={[
                          {
                            required: true,
                            message: "Chọn danh hãng sản xuất!",
                          },
                        ]}
                      >
                        <Select
                          size="large"
                          style={{ width: "100%" }}
                          placeholder="Vui lòng chọn hãng sản xuất"
                        >
                          {brandsData.map((item) => (
                            <Option key={item.id} value={item.name}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item>
                        <Space>
                          {!isUpdate && (
                            <Button
                              htmlType="submit"
                              type="primary"
                              size="large"
                              icon={<SaveOutlined />}
                            >
                              Thêm
                            </Button>
                          )}
                          {!isUpdate && (
                            <Button
                              type="primary"
                              size="large"
                              onClick={resetForm}
                              icon={<PlusOutlined />}
                            >
                              Mới
                            </Button>
                          )}
                          {isUpdate && (
                            <Button
                              htmlType="submit"
                              type="primary"
                              size="large"
                              icon={<EditOutlined />}
                            >
                              Sửa
                            </Button>
                          )}
                        </Space>
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={9}>
                    <div
                      className={styles.products_modal_handle_col}
                      style={{ marginBottom: "25px" }}
                    >
                      <Form.Item label="Hình ảnh" required>
                        <Upload
                          height="250px"
                          setImage={setImageFile}
                          setIsUpload={setIsUpload}
                          isUpload={isUpload}
                          setProfileImg={setProfileImg}
                          profileImg={profileImg}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
      <div className={styles.products_list}>
        <div style={{ width: "100%" }} className={styles.products_list_table}>
          <TableProducts editProduct={editProduct} />
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
