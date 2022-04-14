import { MoreOutlined } from "@ant-design/icons/lib/icons";
import { Dropdown, Menu } from "antd";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import styles from "../Dashboard.module.scss";

Chart.register(Tooltip, Legend, ArcElement);

const PieChart = () => {
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
          <span>Sản phẩm bán ra</span>
        </div>
        <div>
          <Dropdown overlay={menu} placement="bottomRight">
            <div>
              <MoreOutlined style={{ fontSize: "26px", cursor: "pointer" }} />
            </div>
          </Dropdown>
        </div>
      </div>
      <div style={{ padding: "30px" }}>
        <Doughnut
          style={{ height: "400px" }}
          data={{
            labels: ["Direct", "Referral", "Social"],
            datasets: [
              {
                data: [55, 30, 15],
                backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
                hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf"],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
              },
            ],
          }}
          options={{
            cutout: 150,
          }}
        />
      </div>
    </>
  );
};

export default PieChart;
