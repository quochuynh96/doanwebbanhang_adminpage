import React from "react";
import { NumberFormat } from "../../../Common/formatUtils";
import styles from "../Dashboard.module.scss";
import { MoneyFormat } from "../../../Common/formatUtils";

const listCustomers = [
  {
    id: 1,
    image:
      "https://upanh123.com/wp-content/uploads/2021/04/anh-dai-dien-buon-cho-nam16.jpg",
    name: "Võ Đức Huy",
    totalProduct: 10000,
    totalMoney: 10000000,
  },
  {
    id: 2,
    image:
      "https://thuthuatnhanh.com/wp-content/uploads/2018/07/anh-dai-dien-dep.jpg",
    name: "Trần Thanh Hải",
    totalProduct: 10000,
    totalMoney: 2000000,
  },
  {
    id: 3,
    image:
      "https://thuthuatnhanh.com/wp-content/uploads/2020/10/hinh-anh-doraemon-ngai-ngung-390x390.jpg",
    name: "Tạ Kim Tài",
    totalProduct: 10000,
    totalMoney: 1000000,
  },
  {
    id: 4,
    image: "https://how-yolo.net/wp-content/uploads/2021/12/3-3.jpg",
    name: "Kiều Tân Chiến",
    totalProduct: 10000,
    totalMoney: 1000000,
  },
];

const TopCustomer = () => {
  return (
    <>
      <div className={styles.dashboard_topcustomer_title}>
        <span> Khách hàng mua nhiều nhất</span>
      </div>
      <div className={styles.dashboard_topcustomer_list}>
        <table>
          <thead>
            <tr>
              <td colSpan={2} style={{ textAlign: "left" }}>
                Khách hàng
              </td>
              <td>Sản phẩm đã mua</td>
              <td>Tổng tiền</td>
            </tr>
          </thead>
          <tbody>
            {listCustomers.map((cutomer, index) => (
              <tr key={index}>
                <td className={styles.dashboard_topcustomer_list_image}>
                  <img src={cutomer.image} alt="" />
                </td>
                <td className={styles.dashboard_topcustomer_list_name}>
                  {cutomer.name}
                </td>
                <td>{NumberFormat(cutomer.totalProduct)}</td>
                <td>{MoneyFormat(cutomer.totalMoney)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TopCustomer;
