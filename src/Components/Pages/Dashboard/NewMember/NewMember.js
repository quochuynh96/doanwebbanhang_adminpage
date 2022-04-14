import React from "react";
import styles from "../Dashboard.module.scss";
import NewMemberItem from "./NewMemberItem";

const listNewMembers = [
  {
    id: 1,
    image:
      "https://upanh123.com/wp-content/uploads/2021/04/anh-dai-dien-buon-cho-nam16.jpg",
    name: "Võ Đức Huy",
  },
  {
    id: 2,
    image:
      "https://thuthuatnhanh.com/wp-content/uploads/2018/07/anh-dai-dien-dep.jpg",
    name: "Trần Thanh Hải",
  },
  {
    id: 3,
    image:
      "https://thuthuatnhanh.com/wp-content/uploads/2020/10/hinh-anh-doraemon-ngai-ngung-390x390.jpg",
    name: "Tạ Kim Tài",
  },
  {
    id: 4,
    image: "https://how-yolo.net/wp-content/uploads/2021/12/3-3.jpg",
    name: "Kiều Tân Chiến",
  },
  {
    id: 5,
    image:
      "https://toigingiuvedep.vn/wp-content/uploads/2021/05/avatar-hinh-anh-dai-dien-nguoi-giau-mat-502x600.jpg",
    name: "Bùi Nhật Hoàng",
  },
];
const NewMember = () => {
  return (
    <>
      <div className={styles.dashboard_newmember_title}>
        <span>Thành viên mới</span>
      </div>
      <div className={styles.dashboard_newmember_list}>
        {listNewMembers.map((member, index) => (
          <NewMemberItem key={index} image={member.image} name={member.name} />
        ))}
      </div>
    </>
  );
};

export default NewMember;
