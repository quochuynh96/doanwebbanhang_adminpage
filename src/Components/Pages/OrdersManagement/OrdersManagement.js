import React, { useEffect, useState } from "react";

import { Input, Table, Button, Drawer, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./OrdersManagement.module.scss";

import { url } from "../../../App";
import { MoneyFormat, DateFormat } from "../../Common/formatUtils";
import { removeAccents } from "../../Common/StringUtils";
import TimeLineComponent from "./TimeLineComponent";
import ListDrawerComponent from "./ListDrawerComponent";
import TableDrawerComponent from "./TableDrawerComponent";

const OrdersManagement = () => {
  const [isFetchOrder, setIsFetchOrder] = useState(true);
  const [orders, setOrders] = useState([]);
  const [ordersFilter, setOrdersFilter] = useState([]);
  const dataSource = [];
  const [visible, setVisible] = useState(false);
  const [activeTabKey2, setActiveTabKey2] = useState("orderItems");
  const [search, setSearch] = useState("");

  const onchangeSearch = (e) => {
    let keyword = e.target.value;
    setSearch(keyword);
    setOrdersFilter(
      orders.filter((o) =>
        removeAccents(o.user.name + o.user.address + o.user.phoneNumber)
          .toLowerCase()
          .includes(removeAccents(keyword).toLowerCase())
      )
    );
  };

  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const fetchOrders = () => {
    fetch(url + "/orders.json")
      .then((res) => {
        return res.json();
      })
      .then((dataResponse) => {
        let data = [];
        for (let key in dataResponse) {
          data.push({ id: key, ...dataResponse[key] });
        }
        data
          .sort(function (a, b) {
            return a.createdDate - b.createdDate;
          })
          .reverse();
        setOrders(data);
        setIsFetchOrder(false);
      });
  };

  let orderItemsComponent;
  let orderInfoComponent;
  ordersFilter.forEach((order) => {
    orderInfoComponent = <ListDrawerComponent order={order} />;
    orderItemsComponent = <TableDrawerComponent items={order.orderItems} />;

    dataSource.push({
      key: order.id,
      nameCustomer: order.user.name,
      address: order.user.address,
      lastReceiveDate: order.lastReceiveDate
        ? DateFormat(order.lastReceiveDate)
        : "",
      totalPrice: MoneyFormat(order.totalPrice),
      status: (
        <TimeLineComponent order={order} setIsFetchOrder={setIsFetchOrder} />
      ),
      detail: (
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      ),
    });
  });

  const columns = [
    {
      title: "Người mua",
      dataIndex: "nameCustomer",
      key: "nameCustomer",
      className: styles.order_manager_table_col2,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      className: styles.order_manager_table_col6,
      align: "center",
    },
    {
      title: "Ngày nhận",
      dataIndex: "lastReceiveDate",
      key: "lastReceiveDate",
      className: styles.order_manager_table_col8,
      align: "center",
    },
    {
      title: "Tổng hóa đơn",
      dataIndex: "totalPrice",
      key: "totalPrice",
      className: styles.order_manager_table_col9,
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      className: styles.order_manager_table_col9,
      align: "center",
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
      className: styles.order_manager_table_col7,
      align: "center",
    },
  ];

  const tabListNoTitle = [
    {
      key: "orderInfo",
      tab: "Thông tin hóa đơn",
    },
    {
      key: "orderItems",
      tab: "Dánh sách sản phẩm",
    },
  ];

  const contentListNoTitle = {
    orderItems: orderItemsComponent,
    orderInfo: orderInfoComponent,
  };

  useEffect(() => {
    setOrdersFilter(orders);
    if (isFetchOrder) {
      fetchOrders();
    }
  }, [orders, isFetchOrder]);

  return (
    <div className={styles.order}>
      <div className={styles.order_title}>
        <h1>Đơn hàng</h1>
      </div>
      <div className={styles.order_manager}>
        <div className={styles.order_manager_search}>
          <Input
            placeholder="Nhập từ khóa cần tìm kiếm..."
            prefix={<SearchOutlined />}
            size="large"
            style={{ borderRadius: "10px" }}
            value={search}
            onChange={(e) => onchangeSearch(e)}
          />
        </div>
        <div className={styles.order_manager_table}>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>

      <Drawer
        width="50%"
        title="Chi tiết hóa đơn"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Card
          style={{ width: "100%" }}
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey2}
          onTabChange={(key) => {
            onTab2Change(key);
          }}
        >
          {contentListNoTitle[activeTabKey2]}
        </Card>
      </Drawer>
    </div>
  );
};

export default OrdersManagement;
