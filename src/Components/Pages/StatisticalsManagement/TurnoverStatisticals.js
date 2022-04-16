import React, {useEffect, useState} from "react";
import { Line } from "react-chartjs-2";
import StatisticalsManagement from "./StatisticalsManagement";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import styles from "./StatisticalsManagement.module.scss";
import { Dropdown, Menu, Table } from "antd";
import { Select } from "antd";
import { MoreOutlined } from "@ant-design/icons/lib/icons";
import { MoneyFormat } from "../../Common/formatUtils";
import {url} from "../../../App";
import {isEmpty} from "lodash";

const { Option } = Select;

Chart.register(CategoryScale, LinearScale, LineElement, PointElement);
const TurnoverStatisticals = () => {
  const [dataSource, setDataSource] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders()
  }, []);

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
        });

    if (orders.length) {
      const collecttedProducts = {};
      orders.forEach((order) => {
        if (order.orderItems.length) {
          order.orderItems.forEach((item) => {
            if (item.id) {
              let temp = collecttedProducts[item.id] || {};
              if (isEmpty(temp)) {
                temp = {
                  key: Math.floor(Math.random() * 10000) + 1,
                  nameProduct: item.name,
                  totalSolds: 1,
                  price: item.price,
                  totalMoney: item.price,
                }
              } else {
                temp = {
                  ...temp,
                  totalSolds: temp.totalSolds + 1,
                  totalMoney: temp.totalMoney + item.price
                }
              }
              collecttedProducts[item.id] = temp;
            }
          })
        }
      });

      setDataSource(Object.keys(collecttedProducts).map((key) => (collecttedProducts[key])));
    }
  };

  // for (let i = 1; i < 20; i++) {
  //   dataSource.push({
  //     key: i,
  //     nameProduct: "Product " + i,
  //     typeProduct: 32,
  //     totalSolds: "5",
  //     price: MoneyFormat(5600000),
  //     discount: MoneyFormat(200000),
  //     totalMoney: MoneyFormat(5600000 - 200000),
  //   });
  // }

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "nameProduct",
      key: "name",
    },
    {
      title: "Số lượng bán",
      dataIndex: "totalSolds",
      key: "totalSolds",
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalMoney",
      key: "totalMoney",
    },
  ];

  const chart = (
    <Line
      style={{ height: "420px" }}
      data={{
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Earnings",
            lineTension: 0.3,
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "rgba(78, 115, 223, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: [
              0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000,
              25000, 40000,
            ],
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0,
          },
        },

        legend: {
          display: false,
        },
      }}
    />
  );

  const selectFilter = (
    <Select defaultValue="year" size="large" style={{ width: 150 }}>
      <Option value="year">Năm</Option>
      <Option value="week">Tháng</Option>
      <Option value="month">Tuần</Option>
    </Select>
  );
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Năm 2019
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Năm 2020
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Năm 2021
        </a>
      </Menu.Item>
    </Menu>
  );
  const titleChart = (
    <>
      <div>
        <span>Tổng thu nhập</span>
      </div>
      <div>
        <Dropdown overlay={menu} placement="bottomRight">
          <div>
            <MoreOutlined style={{ fontSize: "26px", cursor: "pointer" }} />
          </div>
        </Dropdown>
      </div>
    </>
  );
  return (
    <div>
      <StatisticalsManagement
          title="Thống kê doanh thu"
          chart={chart}
          className={styles.statisticals_chart_content}
          table={
            <Table
                dataSource={[...dataSource]}
                columns={columns}
                pagination={{pageSize: 10}}
            />
          }
          select={selectFilter}
          titleChart={titleChart}
      />
      <div className={styles.totalMoneyStatistical}>
        Tổng doanh thu: <span>{MoneyFormat(50000000000)}</span>
      </div>
    </div>
  );
};

export default TurnoverStatisticals;
