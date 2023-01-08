import React from "react";
import { Avatar, Button, Typography } from "antd";
import className from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { auth } from "../../../firebase/config";
import { useAuth } from "../../hooks";

const cx = className.bind(styles);
function UserInfo() {
  const { displayName, photoURL } = useAuth();

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className={cx("user-info")}>
      <div className={cx("user")}>
        <Avatar src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className={cx("name")}>{displayName}</Typography.Text>
      </div>
      <Button onClick={handleSignOut} ghost className={cx("logout-btn")}>
        Đăng Xuất
      </Button>
    </div>
  );
}

export default UserInfo;
