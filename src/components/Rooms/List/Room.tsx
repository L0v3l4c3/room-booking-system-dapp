import React, { useMemo } from "react";
import { Spin, Button, List, TimePicker, Divider } from "antd";
import { Loadable } from "recoil";
import { PersistentRoom } from "../../../common/entities/Room";
import { CancellableReservation } from "./CancellableReservation";
import { useBookingTransactionsSync } from "./hooks/useBookingTransactionsSync";

import roomImg from "../Room.png";

interface RoomProps {
  room: Loadable<PersistentRoom>;
}

enum LoadableState {
  HAS_ERROR = "hasError",
  LOADING = "loading",
  HAS_VALUE = "hasValue"
}

const Room: React.FC<RoomProps> = React.memo(({ room }) => {
  if (room.state !== LoadableState.HAS_VALUE) {
    return <List.Item><Spin size="large" /></List.Item >
  }

  return <RoomMetadata room={room.contents} />
});

interface RoomMetadataProps {
  room: PersistentRoom;
}

const RoomMetadata: React.FC<RoomMetadataProps> = React.memo(({ room }) => {
  const {
    ethAddress,
    cancellationsPending,
    bookingPending,
    time,
    setHour,
    handleApplyReservation,
    handleCancelReservation,
  } = useBookingTransactionsSync(room.id);

  const bookedHours = useMemo(() => room.getBookedHours(ethAddress), [ethAddress, room]);
  const cancellableHours = useMemo(() => room.getCancellableReservations(ethAddress), [ethAddress, room]);

  return <List.Item>
    <List.Item.Meta
      avatar={<img src={roomImg} alt="Meeting room" className="room-img" />}
      title={room.name}
      description="A sample meeting room, with great outdoor view. Good stuff."
    />
    {cancellableHours.map((hour) => <CancellableReservation key={hour} hour={hour} loading={cancellationsPending.includes(hour)} onClose={handleCancelReservation} />)}
    <Divider type="vertical" />
    <TimePicker format="HH:00" disabledHours={bookedHours} onChange={setHour} value={time} />
    <Button
      type="primary"
      loading={bookingPending}
      className="booking-btn"
      onClick={handleApplyReservation}
      disabled={time === null}
    >Book</Button>
  </List.Item>
})

export { Room };