import React from "react";
import styles from "./Dashboard.module.scss";

const Board = (props) => {
  const { title, value, image, color } = props;
  return (
    <div
      className={styles.dashboard_board_item}
      style={{ borderLeft: `.25rem solid ${color}` }}
    >
      <div>
        <span
          className={styles.dashboard_board_item_title}
          style={{ color: color }}
        >
          {title}
        </span>
        <br />
        <span className={styles.dashboard_board_item_value}>{value}</span>
      </div>
      <div className={styles.dashboard_board_item_image}>{image}</div>
    </div>
  );
};

export default Board;
