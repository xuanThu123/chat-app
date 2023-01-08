import React, { useMemo, useState } from "react";
import className from "classnames/bind";
import { Button, Avatar, Tooltip, Form, Input } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import styles from "./ChatWindow.module.scss";
import Message from "./Message";
import { useRooms, useAuth, useFirestore } from "../../hooks";
import { addDocument } from "../../../firebase/service";

const cx = className.bind(styles);
function ChatWindow() {
  const [valueInput, setValueInput] = useState("");
  const [form] = Form.useForm();

  const { selectedRoom, members, setIsInviteMemberVisible } = useRooms();
  const { uid, displayName, photoURL } = useAuth();

  const handleSubmitForm = (e) => {
    addDocument("messages", {
      roomId: selectedRoom.id,
      uid: uid,
      text: valueInput,
      displayName: displayName,
      photoURL: photoURL,
    });

    form.resetFields(["message"]);
  };

  const messageCondition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );
  const messages = useFirestore("messages", messageCondition);

  return (
    <div className={cx("chatwindow")}>
      <header className={cx("header")}>
        <div className={cx("title")}>
          <p>{selectedRoom.name}</p>
          <span>{selectedRoom.description}</span>
        </div>
        <Button
          onClick={() => setIsInviteMemberVisible(true)}
          className={cx("add-btn")}
          icon={<UserAddOutlined />}
        >
          Mời
        </Button>
        <Avatar.Group size="small" maxCount={2}>
          {members &&
            members.length > 0 &&
            members.map((member) => (
              <Tooltip key={member.id} title={member.displayName}>
                <Avatar src={member.photoURL}>
                  {member.photoURL
                    ? ""
                    : member.displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
        </Avatar.Group>
      </header>
      <main className={cx("message-content")}>
        <div className={cx("messages")}>
          {messages &&
            messages.length > 0 &&
            messages.map((mes) => <Message key={mes.id} data={mes} />)}
        </div>
        <Form form={form} className={cx("form-input")}>
          <Form.Item
            style={{ width: "100%", height: "100%", marginBottom: 0 }}
            name="message"
          >
            <Input
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              type="text"
              placeholder="Nhập tin nhắn..."
              onPressEnter={handleSubmitForm}
              //   style={{ height: "100%" }}
              className={cx("input")}
            />
          </Form.Item>
          <Button className={cx("send-btn")} onClick={handleSubmitForm}>
            Gửi
          </Button>
        </Form>
      </main>
    </div>
  );
}

export default ChatWindow;
