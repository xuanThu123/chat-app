import React from "react";
import { Form, Input, Modal } from "antd";
import { useRooms } from "../../hooks";
import { addDocument } from "../../../firebase/service";
import { useAuth } from "../../hooks";

function AddRoomModal() {
  const { uid } = useAuth();
  const { isAddRoomVisible, setIsAddRoomVisible } = useRooms();
  const [form] = Form.useForm();
  const handleOk = () => {
    addDocument("rooms", {
      ...form.getFieldsValue(),
      members: [uid],
    });

    form.resetFields();
    setIsAddRoomVisible(false);
  };
  const handleCancel = () => {
    setIsAddRoomVisible(false);
    form.resetFields();
  };
  return (
    <Modal
      title="Tạo Phòng"
      visible={isAddRoomVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Tên Phòng" name="name">
          <Input placeholder="Nhập tên phòng" />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nhập mô tả" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddRoomModal;
