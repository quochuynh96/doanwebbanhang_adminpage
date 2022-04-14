import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Form, Input, Modal, message } from "antd";
import styles from "./CategoryManagement.module.scss";
import "./CategoryManagement.scss";

import TableCategories from "./TableCategories";
import { generateSlug } from "../../Common/StringUtils";
import {
  addCategory,
  updateCategory,
  getAllCategories,
  removeCategory,
} from "../../Modules/actions/categories.actions";

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddCategory, setIsAddCategory] = useState(true);

  const categories = useSelector((state) => state.categories);
  const [categoryEdit, setCategoryEdit] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
    setIsAddCategory(true);
  };

  const resetForm = () => {
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetForm();
  };

  const getAllCategoriesTimeOut = (actionMessage) => {
    message
      .loading(`Đang ${actionMessage} danh mục..`, 2)
      .then(() =>
        message.success(actionMessage + " danh mục thành công!", 1.5)
      );
    setTimeout(() => {
      dispatch(getAllCategories());
    }, 2000);
  };

  const addCategoryHandle = (values) => {
    values.slug = generateSlug(values.name);
    values.createdDate = new Date();
    dispatch(addCategory(values));
    handleCancel();
    getAllCategoriesTimeOut("Thêm");
  };

  const updateCategoryHandle = (values) => {
    values.slug = generateSlug(values.name);
    let categoryTemp = { ...categoryEdit, ...values };
    dispatch(updateCategory(categoryTemp.id, categoryTemp));
    handleCancel();
    getAllCategoriesTimeOut("sửa");
  };
  const editCategoryHandler = (id) => {
    const category = categories.filter((c) => c.id === id);
    setCategoryEdit(category[0]);
    showModal();
    setIsAddCategory(false);
    form.setFieldsValue({
      name: category[0].name,
    });
  };

  const removeCategoryHandler = (id) => {
    dispatch(removeCategory(id));
    getAllCategoriesTimeOut("xóa");
  };

  return (
    <div className={styles.category}>
      <div className={styles.category_title}>
        <h1>Danh mục</h1>
        <div>
          <Button type="primary" size="large" onClick={showModal}>
            Thêm danh mục
          </Button>
        </div>
      </div>
      <div className={styles.category_manager}>
        <div className={styles.category_manager_table}>
          <TableCategories
            editCategory={editCategoryHandler}
            removeCategory={removeCategoryHandler}
          />
        </div>
        <Modal
          title="Quản lý hãng sản xuất"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          className={`categories_modal ${styles.categories_modal_handle}`}
        >
          <div className={styles.category_manager_handle}>
            <Form
              layout="vertical"
              onFinish={
                isAddCategory ? addCategoryHandle : updateCategoryHandle
              }
              form={form}
            >
              <div className={styles.category_modal_handle_col}>
                <Form.Item
                  label="Tên danh mục"
                  required
                  name="name"
                  rules={[{ required: true, message: "Nhập tên danh mục!" }]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item>
                  {isAddCategory && (
                    <Button type="primary" size="large" htmlType="submit">
                      Thêm
                    </Button>
                  )}
                  {!isAddCategory && (
                    <Button type="primary" size="large" htmlType="submit">
                      Sửa
                    </Button>
                  )}
                  {isAddCategory && (
                    <Button type="primary" size="large" onClick={resetForm}>
                      Mới
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

export default CategoryManagement;
