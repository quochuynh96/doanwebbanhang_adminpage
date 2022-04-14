import { MoreOutlined } from "@ant-design/icons/lib/icons";
import { Dropdown, Menu } from "antd";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import styles from "../Dashboard.module.scss";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement);

const LineChart = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className={styles.dashboard_chart_line_title}>
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
      </div>
      <div style={{ padding: "0 30px", paddingBottom: "30px" }}>
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
                  0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000,
                  30000, 25000, 40000,
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
      </div>
    </>
  );
};

export default LineChart;
