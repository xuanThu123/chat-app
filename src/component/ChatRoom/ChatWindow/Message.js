import React from "react";
import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns";
import { vi } from "date-fns/locale";
import className from "classnames/bind";
import styles from "./ChatWindow.module.scss";

const cx = className.bind(styles);
function Message({ data }) {
  const { displayName, photoURL, text, createdAt } = data;

  const formatDate = (seconds) => {
    let formatedDate = "";
    if (seconds) {
      formatedDate = formatRelative(new Date(seconds * 1000), new Date(), {
        locale: vi,
      });
      formatedDate =
        formatedDate?.charAt(0)?.toUpperCase() + formatedDate.slice(1);
    }
    return formatedDate;
  };

  return (
    <div>
      <div className={cx("message")}>
        <Avatar src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className={cx("user-name")}>
          {displayName}
        </Typography.Text>
        <Typography.Text className={cx("message-time")}>
          {formatDate(createdAt?.seconds)}
        </Typography.Text>
      </div>
      <div className={cx("content")}>
        <Typography.Text>{text}</Typography.Text>
      </div>
    </div>
  );
}

export default Message;
