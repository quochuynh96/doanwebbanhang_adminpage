import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import React, { useState } from "react";
import styles from "./Login.module.scss";
import logo from "../../../Asserts/images/logo-color.png";
import api from "../../Modules/api/contacts";

const Login = ({ loginHandle }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const style = { borderRadius: 25, paddingLeft: 20 };
  const styleBorder = { borderRadius: 25 };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const submitLoginHandler = async (user) => {
    try {
      const response = await api.get("users.json");

      const u = [];
      for (const key in response.data) {
        u.push(response.data[key]);
      }
      const userLogin = u.find(
        (item) =>
          item.username === user.username && item.password === user.password
      );

      if (userLogin) {
        localStorage.setItem("useradmin", JSON.stringify(userLogin));
        // history("/");
        // window.location.reload();
      } else {
        message.info(
          "Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản và mật khẩu"
        );
        return;
      }
    } catch (error) {
      message.info(
        "Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản và mật khẩu"
      );
      console.log(error);
    }

    loginHandle();
  };

  return (
    <div className={styles.login}>
      <div>
        <div className={styles.login_logo}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.login_form}>
          <Form layout="vertical" onFinish={submitLoginHandler}>
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập username!" }]}
            >
              <Input size="large" style={style} />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập password!" }]}
            >
              <Input.Password size="large" style={style} />
            </Form.Item>
            <div className={styles.login_form_forgot_password}>
              <span onClick={showModal}>Quên mật khẩu ?</span>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ borderRadius: 25 }}
                size="large"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.login_forgotpassword}>
          <Modal
            title="Quên mật khẩu"
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
            width={500}
          >
            <div
              className={styles.login_forgotpassword_from}
              style={styleBorder}
            >
              <div className={styles.login_forgotpassword_from_title}>
                <MailOutlined />
                &ensp;Xác thực tài khoản
              </div>
              <div className={styles.login_forgotpassword_group}>
                <Input style={style} placeholder="Tên đăng nhập" size="large" />
              </div>
              <div className={styles.login_forgotpassword_group}>
                <Input style={style} placeholder="Email" size="large" />
                &ensp;&ensp;
                <Button type="primary" size="large" style={styleBorder}>
                  Gửi mã
                </Button>
              </div>
              <div className={styles.login_forgotpassword_group}>
                <Input style={style} size="large" placeholder="Mã xác nhận" />
              </div>
            </div>
            <div className={styles.login_forgotpassword_submit}>
              <Button type="primary" size="large" style={styleBorder}>
                Xác minh
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Login;
