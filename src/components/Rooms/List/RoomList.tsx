import React, { useCallback } from "react";
import { useRecoilValue, waitForNone } from "recoil";
import { List } from "antd"
import { Room } from "./Room";
import { RoomQueriesState } from "../recoil/rooms.atoms";

const RoomList = React.memo(() => {
  const renderItem = useCallback((item) => <Room room={item} />, []);

  const rooms = useRecoilValue(waitForNone([
    RoomQueriesState(0),
    RoomQueriesState(1),
    RoomQueriesState(2),
    RoomQueriesState(3),
    RoomQueriesState(4),
    RoomQueriesState(5),
    RoomQueriesState(6),
    RoomQueriesState(7),
    RoomQueriesState(8),
    RoomQueriesState(9),
    RoomQueriesState(10),
    RoomQueriesState(11),
    RoomQueriesState(12),
    RoomQueriesState(13),
    RoomQueriesState(14),
    RoomQueriesState(15),
    RoomQueriesState(16),
    RoomQueriesState(17),
    RoomQueriesState(18),
    RoomQueriesState(19),
  ]));

  return <List
    itemLayout="horizontal"
    dataSource={rooms}
    renderItem={renderItem}
  />
});

export default RoomList;