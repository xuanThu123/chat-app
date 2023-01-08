import React from "react";
import { Row, Col, Alert } from "antd";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { useRooms } from "../hooks";

function ChatRoom() {
  const { selectedRoomId } = useRooms();
  return (
    <Row>
      <Col span={8}>
        <Sidebar />
      </Col>
      {selectedRoomId ? (
        <Col span={16}>
          <ChatWindow />
        </Col>
      ) : (
        <Col span={16}>
          <Alert
            type="info"
            message="Vui lòng chọn phòng!"
            showIcon
            closable
            style={{ width: "100%" }}
          />
        </Col>
      )}
    </Row>
  );
}

export default ChatRoom;
