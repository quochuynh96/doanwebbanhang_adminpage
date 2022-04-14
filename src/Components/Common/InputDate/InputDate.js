import React from "react";
import styles from "./InputDate.module.scss";

const InputDate = ({ value, onChange }) => {
  return (
    <div className={styles.input_date}>
      <input
        type={"date"}
        value={value}
        onChange={onChange}
        className={styles.input_date_form}
      />
    </div>
  );
};

export default InputDate;
