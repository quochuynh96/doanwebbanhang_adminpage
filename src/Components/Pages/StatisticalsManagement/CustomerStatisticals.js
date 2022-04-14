import { Select, Table } from "antd";
import React from "react";
import { Bar } from "react-chartjs-2";
import { NumberFormat } from "../../Common/formatUtils";
import StatisticalsManagement from "./StatisticalsManagement";
import styles from "./StatisticalsManagement.module.scss";
import { MoneyFormat } from "../../Common/formatUtils";

const { Option } = Select;

const CustomerStatisticals = () => {
  const dataSource = [];

  for (let i = 1; i < 20; i++) {
    dataSource.push({
      key: i,
      id: i,
      fullname: "Khách hàng " + i,
      totalProduct: NumberFormat(5000),
      money: MoneyFormat(300000000),
      lastPurchaseDate: "20-12-2021",
      typeCustomer: "Vàng",
    });
  }

  const columns = [
    {
      title: "Mã khách hàng",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "10%",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "name",
    },

    {
      title: "Số lượng sản phẩm đã mua",
      dataIndex: "totalProduct",
      key: "totalProduct",
      align: "center",
    },
    {
      title: "Tổng tiền đã thanh toán",
      dataIndex: "money",
      key: "money",
      align: "center",
    },
    {
      title: "Ngày mua gần nhất",
      dataIndex: "lastPurchaseDate",
      key: "lastPurchaseDate",
      align: "center",
    },
    {
      title: "Loại khách hàng",
      dataIndex: "typeCustomer",
      key: "typeCustomer",
      align: "center",
    },
  ];
  const chart = (
    <Bar
      style={{ height: "300px" }}
      data={{
        labels: [
          "Khách hàng 1",
          "Khách hàng 2",
          "Khách hàng 3",
          "Khách hàng 4",
          "Khách hàng 5",
        ],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#3090fb"],
            data: [10000, 20000, 50000, 70000, 100000],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: "Predicted world population (millions) in 2050",
        },
        maintainAspectRatio: false,
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
  const titleChart = (
    <>
      <div>
        <span>Thống kế khách hàng mua hàng nhiều nhất</span>
      </div>
    </>
  );
  return (
    <div>
      <StatisticalsManagement
        title="Thống kê khách hàng"
        chart={chart}
        table={
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        }
        className={styles.statisticals_chart_content}
        select={selectFilter}
        titleChart={titleChart}
      />
    </div>
  );
};

export default CustomerStatisticals;
