import React from "react";
import { Bar } from "react-chartjs-2";
import StatisticalsManagement from "./StatisticalsManagement";
import { BarElement, Chart } from "chart.js";
import styles from "./StatisticalsManagement.module.scss";
import { Table } from "antd";
import { Select } from "antd";

const { Option } = Select;

Chart.register(BarElement);
const RateStatisticals = () => {
  const dataSource = [];

  for (let i = 1; i < 20; i++) {
    dataSource.push({
      key: i,
      nameProduct: "Product " + i,
      rating: 32,
      rateMax: "5",
      rateMin: "1",
    });
  }

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "nameProduct",
      key: "name",
    },
    {
      title: "Lượt đánh giá",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Sao nhiều nhất",
      dataIndex: "rateMax",
      key: "rateMax",
    },
    {
      title: "Sao thấp nhất",
      dataIndex: "rateMin",
      key: "rateMin",
    },
  ];
  const chart = (
    <Bar
      style={{ height: "300px" }}
      data={{
        labels: ["1", "2", "3", "4 ", "5 "],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
            ],
            data: [10, 20, 30, 40, 50],
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
  return (
    <div>
      <StatisticalsManagement
        title="Thống kê đánh giá"
        chart={chart}
        className={styles.statisticals_chart_content}
        table={
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        }
        select={selectFilter}
        titleChart={<span>Thống kê lượt đánh giá</span>}
      />
    </div>
  );
};

export default RateStatisticals;
