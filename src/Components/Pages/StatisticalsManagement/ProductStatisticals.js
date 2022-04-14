import { Radio, Select, Table } from "antd";
import React from "react";
import { Bar } from "react-chartjs-2";
import { NumberFormat } from "../../Common/formatUtils";
import StatisticalsManagement from "./StatisticalsManagement";
import styles from "./StatisticalsManagement.module.scss";

const { Option } = Select;

const ProductStatisticals = () => {
  const [value, setValue] = React.useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const dataSource = [];

  for (let i = 1; i < 20; i++) {
    dataSource.push({
      key: i,
      id: i,
      nameProduct: "Product " + i,
      totalSold: NumberFormat(500000),
      remainingQuantity: NumberFormat(30000),
    });
  }

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "10%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "nameProduct",
      key: "name",
    },

    {
      title: "Số lượng đã bán",
      dataIndex: "totalSold",
      key: "totalSold",
      align: "center",
    },
    {
      title: "Số lượng còn lại",
      dataIndex: "remainingQuantity",
      key: "remainingQuantity",
      align: "center",
    },
  ];
  const chart = (
    <Bar
      style={{ height: "300px" }}
      data={{
        labels: [
          "Sản phẩm 1",
          "Sản phẩm 2",
          "Sản phẩm 3",
          "Sản phẩm 4",
          "Sản phẩm 5",
          "Sản phẩm 6",
          "Sản phẩm 7",
          "Sản phẩm 8",
          "Sản phẩm 9",
          "Sản phẩm 10",
        ],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#3090fb"],
            data: [
              10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000,
              100000,
            ],
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
        <span>
          Thống kế sản phẩm {value === 1 ? "bán chạy nhất" : "bán chậm nhất"}
        </span>
      </div>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>Bán chạy nhất</Radio>
        <Radio value={2}>Bán chậm nhất</Radio>
      </Radio.Group>
    </>
  );
  return (
    <div>
      <StatisticalsManagement
        title="Thống kê sản phẩm"
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

export default ProductStatisticals;
