import React from "react";
import styles from "./StatisticalsManagement.module.scss";

const StatisticalsManagement = (props) => {
  const { chart, table, title, className, select, titleChart } = props;
  return (
    <div className={styles.statisticals}>
      <div className={styles.statisticals_title}>
        <h1>{title}</h1>
        <div>{select}</div>
      </div>
      <div className={styles.statisticals_chart}>
        <div className={styles.statisticals_chart_title}>{titleChart}</div>
        <div className={className}>{chart}</div>
      </div>
      <div className={styles.statisticals_table}>{table}</div>
    </div>
  );
};

export default StatisticalsManagement;
