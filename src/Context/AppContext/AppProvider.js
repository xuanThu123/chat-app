import React, { useMemo, useState } from "react";
import AppContext from "./AppContext";
import { useFirestore, useAuth } from "../../component/hooks";

function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const { uid } = useAuth();
  const roomCondition = useMemo(
    () => ({
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    }),
    [uid]
  );
  const rooms = useFirestore("rooms", roomCondition);
  const selectedRoom = useMemo(() => {
    return rooms.find((room) => room.id === selectedRoomId) || {};
  }, [rooms, selectedRoomId]);
  const membersCondition = useMemo(
    () => ({
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    }),
    [selectedRoom.members]
  );

  const members = useFirestore("users", membersCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        members,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
