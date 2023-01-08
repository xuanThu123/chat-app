import React from "react";
import className from "classnames/bind";
import styles from "./Sidebar.module.scss";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";

const cx = className.bind(styles);
function Sidebar() {
  return (
    <div className={cx("wrapper")}>
      <UserInfo />
      <RoomList />
    </div>
  );
}

export default Sidebar;
