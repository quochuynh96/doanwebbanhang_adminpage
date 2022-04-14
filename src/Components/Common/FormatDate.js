import React from "react";

const FormatDate = ({ day }) => {
  const date = day.getDate() < 10 ? `0${day.getDate()}` : day.getDate();
  const month =
    day.getMonth() < 10 ? `0${day.getMonth() + 1}` : day.getMonth() + 1;
  const year = day.getFullYear();
  return <>{`${date}/${month}/${year}`}</>;
};

export default FormatDate;
