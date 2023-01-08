import React, { useMemo, useState } from "react";
import { debounce } from "lodash";
import { Avatar, Form, Modal, Select, Spin } from "antd";
import { useRooms } from "../../hooks";
import { db } from "../../../firebase/config";

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 500,
  curMembers,
  ...props
}) {
  const [fetching, setFetChing] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetChing(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetChing(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, curMembers) {
  return db
    .collection("users")
    .where("keywords", "array-contains", search)
    .orderBy("displayName")
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((opt) => !curMembers.includes(opt.value));
    });
}

function InviteMemberModal() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useRooms();

  const [value, setValue] = useState([]);
  const [form] = new Form.useForm();

  const handleOk = () => {
    form.resetFields();
    setIsInviteMemberVisible(false);

    const roomRef = db.collection("rooms").doc(selectedRoomId);
    roomRef.update({
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setValue([]);
    setIsInviteMemberVisible(false);
  };

  return (
    <Modal
      title="Mời thêm thành viên"
      visible={isInviteMemberVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <DebounceSelect
          mode="multiple"
          label="Tên các thành viên"
          value={value}
          placeholder="Nhập tên thành viên"
          fetchOptions={fetchUserList}
          onChange={(newValue) => setValue(newValue)}
          style={{ width: "100%" }}
          curMembers={selectedRoom.members}
        ></DebounceSelect>
      </Form>
    </Modal>
  );
}

export default InviteMemberModal;
