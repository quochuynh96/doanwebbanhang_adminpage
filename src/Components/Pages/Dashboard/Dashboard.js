import { Col, Row } from "antd";
import React from "react";
import styles from "./Dashboard.module.scss";
import Board from "./Board";
import {
  FaCalendar,
  FaMailBulk,
  FaMoneyBillWaveAlt,
  FaUsers,
} from "react-icons/fa";

import LineChart from "./Chart/LineChart";
import PieChart from "./Chart/PieChart";
import NewMember from "./NewMember/NewMember";
import TopCustomer from "./TopCustomer/TopCustomer";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard_title}>Dashboard</div>
      <div className={styles.dashboard_board}>
        <Row gutter={30}>
          <Col className="gutter-row" span={6}>
            <Board
              title="tổng tiền (tháng)"
              value="10.000 VND"
              image={<FaCalendar />}
              color="#4e73df"
            />
          </Col>
          <Col className="gutter-row" span={6}>
            <Board
              title="tổng tiền (năm)"
              value="10.000.000 VND"
              image={<FaMoneyBillWaveAlt />}
              color="#1cc88a"
            />
          </Col>
          <Col className="gutter-row" span={6}>
            <Board
              title="số lượng khách hàng"
              value="10.000"
              image={<FaUsers />}
              color="#36b9cc"
            />
          </Col>
          <Col className="gutter-row" span={6}>
            <Board
              title="đánh giá"
              value="9.969"
              image={<FaMailBulk />}
              color="#f6c23e"
            />
          </Col>
        </Row>
      </div>
      <div className={styles.dashboard_chart}>
        <div className={styles.dashboard_chart_line}>
          <LineChart />
        </div>
        <div className={styles.dashboard_chart_pie}>
          <PieChart />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={styles.dashboard_newmember}>
          <NewMember />
        </div>
        <div className={styles.dashboard_topcustomer}>
          <TopCustomer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
