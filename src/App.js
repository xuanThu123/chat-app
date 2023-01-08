import React from "react";
import { Routes, Route } from "react-router-dom";
import ChatRoom from "./component/ChatRoom";
import Login from "./component/Login";
import AddRoomModal from "./component/ChatRoom/Modal";
import { InviteMemberModal } from "./component/ChatRoom/Modal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ChatRoom />} />
      </Routes>
      <AddRoomModal />
      <InviteMemberModal />
    </>
  );
}

export default App;
