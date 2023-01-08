import React from "react";
import { Collapse, Typography, Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useRooms } from "../../hooks";

function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useRooms();
  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <Collapse.Panel header="Danh sách các phòng" key={1}>
        {rooms &&
          rooms.length > 0 &&
          rooms.map((room) => (
            <Typography.Link
              onClick={() => setSelectedRoomId(room.id)}
              key={room.id}
            >
              {room.name}
            </Typography.Link>
          ))}
        <Button
          style={{ padding: 0, color: "white" }}
          type="text"
          icon={<PlusSquareOutlined />}
          onClick={handleAddRoom}
        >
          Thêm Phòng
        </Button>
      </Collapse.Panel>
    </Collapse>
  );
}

export default RoomList;
