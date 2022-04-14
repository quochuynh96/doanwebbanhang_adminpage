import { Select } from "antd";
import React from "react";

const SelectSearch = (props) => {
  const { setValue, placeholder } = props;
  return (
    <Select
      showSearch
      style={{ width: "90%" }}
      size="large"
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={(e) => setValue(e)}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA, optionB) =>
        optionA.children
          .toLowerCase()
          .localeCompare(optionB.children.toLowerCase())
      }
    >
      {props.children}
    </Select>
  );
};

export default SelectSearch;
