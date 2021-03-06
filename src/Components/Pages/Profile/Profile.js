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

    message.loading("??ang x??? l??...", 5);
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

    message.success("C???p nh???t th??ng tin th??nh c??ng!");
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
                <Button onClick={() => setChangeImage(true)}>?????i avatar</Button>
              )}
            </div>
          </Col>
          <Col span={10}>
            <div className={styles.profile_infor}>
              <h1>H??? s??</h1>

              <Form.Item
                label="T??n ????ng nh???p"
                name="username"
                rules={[{ required: true, message: "Nh???p t??n ????ng nh???p!" }]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="H??? v?? t??n"
                name="fullName"
                rules={[{ required: true, message: "Nh???p h??? v?? t??n!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Gi???i t??nh"
                name="gender"
                rules={[{ required: true, message: "Ch???n gi???i t??nh!" }]}
              >
                <Radio.Group>
                  <Radio value={true}>Nam</Radio>
                  <Radio value={false}>N???</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Ng??y sinh">
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
                rules={[{ required: true, message: "Nh???p email!" }]}
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
                  L??u
                </Button>
              </Form.Item>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.profile_infor} style={{ marginTop: "50px" }}>
              <Form.Item
                label="S??? ??i???n tho???i"
                name="phoneNumber"
                rules={[{ required: true, message: "Nh???p s??? ??i???n tho???i!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="?????a ch???"
                name="address"
                rules={[{ required: true, message: "Nh???p ?????a ch???!" }]}
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
