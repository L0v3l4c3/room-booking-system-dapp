import { atomFamily } from "recoil";
import { PersistentRoom } from "../../../common/entities/Room";
import { RoomQueriesSelector } from "./rooms.selectors";

const PendingCancellationsState = atomFamily<number[], number>({
  key: "pending-cancellations-state",
  default: []
});

const PendingReservationState = atomFamily<boolean, number>({
  key: "pending-reservations-state",
  default: false
});

const RoomQueriesState = atomFamily<PersistentRoom, number>({
  key: "room-queries-state",
  default: (roomId) => RoomQueriesSelector(roomId)
})

const SelectedTimeState = atomFamily<moment.Moment | null, number>({
  key: "selected-time-state",
  default: null
})

export { PendingCancellationsState, PendingReservationState, RoomQueriesState, SelectedTimeState };