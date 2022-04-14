import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
} from "antd";
import React, { useState } from "react";
import styles from "./EventsManagement.module.scss";
import "./EventsManagement.scss";
import TableEvents from "./TableEvents";
import { Upload } from "./../../Common/Upload/Upload";
import { useDispatch, useSelector } from "react-redux";
import InputDate from "../../Common/InputDate/InputDate";
import { v4 as uuidv4 } from "uuid";
import { addEvent, updateEvent } from "../../Modules/actions/events.actions";

const { Option } = Select;

const EventsManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddEvent, setIsAddEvent] = useState(true);
  const events = useSelector((state) => state.events);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [typeBanner, setTypeBanner] = useState("Main");
  const [linkToWeb, setLinkToWeb] = useState("");
  const [orderIndex, setOrderIndex] = useState("");
  const [created, setCreated] = useState(
    new Date().toLocaleDateString("fr-CA")
  );
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
    setIsAddEvent(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setTypeBanner("Main");
    setImage("");
    setLinkToWeb("");
    setOrderIndex("");
    setCreated(new Date().toLocaleDateString("fr-CA"));
    setStatus(false);
  };

  const newEvent = {
    id: uuidv4(),
    image,
    title,
    typeBanner,
    linkToWeb,
    orderIndex,
    created,
    status,
  };

  const addEventHandle = async () => {
    dispatch(addEvent(newEvent));
    handleCancel();
  };

  const editEvent = (id) => {
    const event = events.filter((event) => event.id === id);
    showModal();
    setId(event[0].id);
    setTitle(event[0].title);
    setTypeBanner(event[0].typeBanner);
    setImage(event[0].image);
    setLinkToWeb(event[0].linkToWeb);
    setOrderIndex(event[0].orderIndex);
    setCreated(event[0].created);
    setStatus(event[0].status);
    setIsAddEvent(false);
  };

  const updateProductHandle = () => {
    dispatch(updateEvent(id, newEvent));
    handleCancel();
  };

  return (
    <div className={styles.event}>
      <div className={styles.event_title}>
        <h1>Sự kiện</h1>
        <div>
          <Button type="primary" size="large" onClick={showModal}>
            Thêm sự kiện
          </Button>
        </div>
      </div>
      <div className={styles.event_manager}>
        <div className={styles.event_manager_table}>
          <TableEvents editEvent={editEvent} />
        </div>

        <Modal
          title="Quản lý sự kiện"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={1000}
          className={`events_modal ${styles.events_modal_handle}`}
        >
          <div className={styles.event_manager_handle}>
            <Form layout="vertical" onFinish={handleCancel}>
              <Row gutter={30}>
                <Col span={8}>
                  <div className={styles.event_manager_handle_col}>
                    <Form.Item label="Trạng thái" required>
                      <Radio.Group
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                      >
                        <Radio value={true}>Actived</Radio>
                        <Radio value={false}>Not activated</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Divider />
                    <Form.Item label="Hình ảnh">
                      <Upload height="237.33px" setImage={setImage} />
                    </Form.Item>
                  </div>
                  <div
                    className={styles.event_manager_handle_col}
                    style={{
                      marginTop: "30px",
                      display: "flex",
                      justifyContent: "space-around",
                      flexWrap: "wrap",
                    }}
                  >
                    {isAddEvent && (
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        onClick={addEventHandle}
                      >
                        Thêm
                      </Button>
                    )}
                    {!isAddEvent && (
                      <Button
                        type="primary"
                        size="large"
                        onClick={updateProductHandle}
                      >
                        Sửa
                      </Button>
                    )}
                    {isAddEvent && (
                      <Button type="primary" size="large" onClick={resetForm}>
                        Mới
                      </Button>
                    )}
                  </div>
                </Col>
                <Col span={16}>
                  <div className={styles.event_manager_handle_col}>
                    <Form.Item label="Tiêu đề" required>
                      <Input
                        size="large"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item label="Loại banner" required>
                      <Select
                        defaultValue="Main"
                        value={typeBanner}
                        style={{ width: 120 }}
                        size="large"
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                        style={{ width: "100%" }}
                        onChange={(e) => setTypeBanner(e)}
                      >
                        <Option value="Main">Main</Option>
                        <Option value="Sub">Sub</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Ngày tạo">
                      <InputDate
                        value={created}
                        onChange={(e) => setCreated(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item label="Địa chỉ trang web" required>
                      <Input
                        size="large"
                        value={linkToWeb}
                        onChange={(e) => setLinkToWeb(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item label="Số đặt hàng" required>
                      <Input
                        size="large"
                        value={orderIndex}
                        onChange={(e) => setOrderIndex(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default EventsManagement;
