import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Form, Input, Modal, message } from "antd";
import styles from "./BrandsManagement.module.scss";
import "./BrandsManagement.scss";

import TableBrands from "./TableBrands";
import { Upload } from "./../../Common/Upload/Upload";
import { storage } from "../../../firebase";
import {
  addBrand,
  updateBrand,
  getAllBrands,
  removeBrand,
} from "../../Modules/actions/brands.actions";

const BrandsManagement = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSpin, setIsSpin] = useState(false);
  const [isAddBrand, setIsAddBrand] = useState(true);
  const [isUpload, setIsUpload] = useState(true);

  const [imageFile, setImageFile] = useState("");
  const [profileImg, setProfileImg] = useState("");
  let urlImageWasUpload = "";

  const brands = useSelector((state) => state.brands);
  const [brandEdit, setBrandEdit] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
    setIsAddBrand(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    form.resetFields();
    setImageFile("");
    setProfileImg("");
    setIsUpload(true);
  };

  const getAllBrandsTimeOut = (actionMessage, timeOut = 1) => {
    message
      .loading(`Đang ${actionMessage} hãng sản xuất..`, timeOut)
      .then(() =>
        message.success(actionMessage + " hãng sản xuất thành công!", 1.5)
      );
    setTimeout(() => {
      dispatch(getAllBrands());
    }, timeOut * 1000);
  };

  const addBrandHandle = (values) => {
    uploadImageHandler();
    setTimeout(() => {
      values.createdDate = new Date();
      values.image = urlImageWasUpload;
      dispatch(addBrand(values));
    }, 3000);
    handleCancel();
    getAllBrandsTimeOut("Thêm", 4);
  };

  const updateBrandHandle = (values) => {
    let brandTemp = { ...brandEdit, ...values };
    if (!isUpload) {
      uploadImageHandler(imageFile);
      setTimeout(() => {
        brandTemp.image = urlImageWasUpload;
        dispatch(updateBrand(brandTemp.id, brandTemp));
      }, 3000);
      handleCancel();
      getAllBrandsTimeOut("sửa", 4);
    } else {
      dispatch(updateBrand(brandTemp.id, brandTemp));
      handleCancel();
      getAllBrandsTimeOut("sửa");
    }
  };
  const editBrandHandler = (id) => {
    const Brand = brands.filter((c) => c.id === id);
    setBrandEdit(Brand[0]);
    showModal();
    setIsAddBrand(false);
    form.setFieldsValue({
      name: Brand[0].name,
    });
  };

  const removeBrandHandler = (id) => {
    dispatch(removeBrand(id));
    getAllBrandsTimeOut("xóa");
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

  return (
    <div className={styles.brand}>
      <div className={isSpin ? styles.brand_spin : ""}></div>
      <div className={styles.brand_title}>
        <h1>Hãng sản xuất</h1>
        <div>
          <Button type="primary" size="large" onClick={showModal}>
            Thêm hãng sản xuất
          </Button>
        </div>
      </div>
      <div className={styles.brand_manager}>
        <div className={styles.brand_manager_table}>
          <TableBrands
            editBrand={editBrandHandler}
            removeBrand={removeBrandHandler}
          />
        </div>

        <Modal
          title="Quản lý hãng sản xuất"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          className={`brands_modal ${styles.brands_modal_handle}`}
        >
          <div className={styles.brand_manager_handle}>
            <Form
              layout="vertical"
              enctype="multipart/form-data"
              form={form}
              onFinish={isAddBrand ? addBrandHandle : updateBrandHandle}
            >
              <div className={styles.brand_modal_handle_col}>
                <Form.Item
                  label="Tên hãng sản xuất"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Chưa nhập tên sản phẩm",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                  <Upload
                    height="250px"
                    setImage={setImageFile}
                    setIsUpload={setIsUpload}
                    isUpload={isUpload}
                    setProfileImg={setProfileImg}
                    profileImg={profileImg}
                  />
                </Form.Item>
                <Form.Item>
                  <div
                    style={{
                      marginTop: "30px",
                      display: "flex",
                      justifyContent: "space-around",
                      flexWrap: "wrap",
                    }}
                  >
                    {isAddBrand && (
                      <Button type="primary" size="large" htmlType="submit">
                        Thêm
                      </Button>
                    )}
                    {!isAddBrand && (
                      <Button type="primary" size="large" htmlType="submit">
                        Sửa
                      </Button>
                    )}

                    {isAddBrand && (
                      <Button type="primary" size="large" onClick={resetForm}>
                        Mới
                      </Button>
                    )}
                  </div>
                </Form.Item>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BrandsManagement;
