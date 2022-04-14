import React from "react";
import { Popconfirm, Button, Timeline } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

import { url } from "../../../App";

const TimeLineComponent = ({ order, setIsFetchOrder }) => {
  let statusValue = order.status === "process" ? "shipping" : "finish";
  let statusText =
    order.status === "process" ? "Bắt đầu giao hàng" : "Hoàn tất đơn hàng";
  let statusTitle =
    order.status === "process"
      ? "Bạn muốn bắt đầu giao hàng ?"
      : "Bạn muốn hoàn tất đơn hàng ?";

  const onConfirmChangeStatusHandler = (order, status) => {
    order.status = status;
    if (status === "shipping") {
      order.shippingDate = new Date();
    }
    fetch(url + `/orders/${order.id}.json`, {
      method: "PUT",
      body: JSON.stringify(order),
    });

    setTimeout(setIsFetchOrder(true), 1500);
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1500);
    });
  };

  return (
    <div>
      <Timeline
        mode="left"
        pending={
          order.status !== "finish" && order.status !== "process"
            ? "Đang giao hàng..."
            : false
        }
      >
        {order.status !== "shipping" && order.status !== "process" && (
          <Timeline.Item label="2015-09-01">
            <p>Xác nhận và giao hàng</p>
          </Timeline.Item>
        )}
        {order.status === "finish" && (
          <Timeline.Item
            label="2015-09-01"
            color="green"
            dot={<CheckCircleOutlined />}
          >
            <p>Nhận hàng</p>
          </Timeline.Item>
        )}
      </Timeline>
      {order.status !== "finish" && (
        <Popconfirm
          title={statusTitle}
          onConfirm={() => {
            return onConfirmChangeStatusHandler(order, statusValue);
          }}
        >
          <Button type="primary">{statusText}</Button>
        </Popconfirm>
      )}
    </div>
  );
};

export default TimeLineComponent;
