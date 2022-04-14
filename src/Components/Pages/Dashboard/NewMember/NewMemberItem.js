import React from "react";
import { EyeOutlined } from "@ant-design/icons/lib/icons";
import { Button } from "antd";
import styles from "../Dashboard.module.scss";

const NewMemberItem = (props) => {
  const { image, name } = props;
  return (
    <div className={styles.dashboard_newmember_list_item}>
      <div className={styles.dashboard_newmember_list_item_info}>
        <div className={styles.dashboard_newmember_list_item_info_image}>
          <img src={image} alt="" />
        </div>
        <div className={styles.dashboard_newmember_list_item_info_name}>
          <span>{name}</span>
        </div>
      </div>
      <div className={styles.dashboard_newmember_list_item_button}>
        <Button icon={<EyeOutlined />}>Xem</Button>
      </div>
    </div>
  );
};

export default NewMemberItem;
