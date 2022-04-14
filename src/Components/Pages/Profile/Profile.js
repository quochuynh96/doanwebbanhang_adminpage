import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Row,
} from "antd";
import moment from "moment";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { storage } from "../../../firebase";
import { sleep } from "../../Common/sleep";
import styles from "./Profile.module.scss";
import { Upload } from "./../../Common/Upload/Upload";

const Profile = () => {
  // const history = useHistory();

  const url = "https://tech-store-44eac-default-rtdb.firebaseio.com/";
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isUpload, setIsUpload] = useState(true);
  const [listUser, setListUser] = useState([]);
  const [imageFile, setImageFile] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [changeImage, setChangeImage] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const userLocal = JSON.parse(localStorage.getItem("useradmin"));
  const [user, setUser] = useState([]);

  useEffect(() => {
    setUser(userLocal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChange]);

  let urlImageWasUpload = "";
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
  const getAllUser = async () => {
    const requestUrl = url + "users.json";
    const response = await axios(requestUrl);

    const data = response.data;

    const u = [];

    for (const i in data) {
      u.push({
        id: i,
        active: data[i].active,
        address: data[i].address,
        avatar: data[i].avatar,
        dateOfBirth: data[i].dateOfBirth,
        email: data[i].email,
        fullName: data[i].fullName,
        gender: data[i].gender,
        phoneNumber: data[i].phoneNumber,
        role: data[i].role,
        username: data[i].username,
        password: data[i].password,
      });
    }

    return u;
  };
  useEffect(() => {
    const fetchData = async () => {
      const resp = await getAllUser();
      setListUser(resp);
    };
    fetchData();
  }, [isChange]);

  const [form] = Form.useForm();

  const onFill = () => {
    form.setFieldsValue({
      username: userLocal.username,
      address: userLocal.address,
      email: userLocal.email,
      fullName: userLocal.fullName,
      gender: userLocal.gender,
      phoneNumber: userLocal.phoneNumber,
    });
    setDateOfBirth(userLocal.dateOfBirth);
    setProfileImg(userLocal.avatar);
    setChangeImage(true);
  };

  const onFinish = async (values) => {
    const newUser = listUser.find(
      (u) => u.username === user.username && u.password === user.password
    );

    uploadImageHandler();

    message.loading("Đang xử lý...", 5);
    setIsChange(!isChange);
    await sleep(6000);
    const data = {
      ...values,
      dateOfBirth,
      avatar: urlImageWasUpload,
      role: newUser.role,
      active: newUser.active,
      password: newUser.password,
      id: newUser.id,
    };

    fetch(
      "https://tech-store-44eac-default-rtdb.firebaseio.com" +
        `/users/${user.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );

    message.success("Cập nhật thông tin thành công!");
    await sleep(300);
    localStorage.removeItem("useradmin");
    window.location.reload();
    // history.push("/auth");
  };

  useEffect(() => {
    onFill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChange]);

  return (
    <div className={styles.profile}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={60}>
          <Col span={6}>
            <div className={styles.profile_avatar}>
              {changeImage && (
                <Upload
                  height="250px"
                  setImage={setImageFile}
                  setIsUpload={setIsUpload}
                  isUpload={isUpload}
                  setProfileImg={setProfileImg}
                  profileImg={profileImg}
                />
              )}

              {!changeImage && (
                <Button onClick={() => setChangeImage(true)}>Đổi avatar</Button>
              )}
            </div>
          </Col>
          <Col span={10}>
            <div className={styles.profile_infor}>
              <h1>Hồ sơ</h1>

              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[{ required: true, message: "Nhập tên đăng nhập!" }]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[{ required: true, message: "Nhập họ và tên!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: "Chọn giới tính!" }]}
              >
                <Radio.Group>
                  <Radio value={true}>Nam</Radio>
                  <Radio value={false}>Nữ</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Ngày sinh">
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                  // eslint-disable-next-line no-undef
                  value={moment(dateOfBirth, "YYYY-MM-DD")}
                  onChange={(e) => setDateOfBirth(e._d)}
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Nhập email!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item className={styles.profile_infor_group}>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  style={{ width: 100 }}
                >
                  Lưu
                </Button>
              </Form.Item>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.profile_infor} style={{ marginTop: "50px" }}>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[{ required: true, message: "Nhập số điện thoại!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Nhập địa chỉ!" }]}
              >
                <Input />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Profile;
