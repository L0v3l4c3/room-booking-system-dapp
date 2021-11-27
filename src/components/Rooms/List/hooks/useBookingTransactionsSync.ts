import { useCallback, useMemo } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from "recoil";
import { message } from "antd";
import { bookingContract } from "../../../../common/const";
import { Web3AccountState } from "../../../Auth/recoil/auth.atoms";
import { PendingCancellationsState, PendingReservationState, SelectedTimeState } from "../../recoil/rooms.atoms";
import { RoomQueriesSelector } from "../../recoil/rooms.selectors";

const useBookingTransactionsSync = (roomId: number) => {
  const ethAddress = useRecoilValue(Web3AccountState);
  const [cancellationsPending, setCancellationsPending] = useRecoilState(PendingCancellationsState(roomId));
  const [bookingPending, setBookingPending] = useRecoilState(PendingReservationState(roomId));
  const [time, setHour] = useRecoilState(SelectedTimeState(roomId));
  const clearRoomSelectorCache = useRecoilRefresher_UNSTABLE(RoomQueriesSelector(roomId));

  const selectedHour = useMemo(() => time?.hour(), [time]);

  const handleCancelReservation = useCallback(async (hour) => {
    try {
      setCancellationsPending((c) => c.concat(hour));
      await bookingContract.methods.cancelReservation(roomId, hour).send({ from: ethAddress });
      message.success(`Cancellation applied !`);
    } catch (err) {
      message.error("Something went wrong during the cancellation")
    } finally {
      clearRoomSelectorCache();
      setCancellationsPending((c) => c.filter(h => h !== hour));
    }
  }, [ethAddress, roomId, setCancellationsPending, clearRoomSelectorCache]);

  const handleApplyReservation = useCallback(async () => {
    try {
      setBookingPending(true);
      await bookingContract.methods.applyReservation(roomId, selectedHour!).send({ from: ethAddress });
      message.success(`Reservation applied !`);
    } catch (err) {
      message.error("Something went wrong during the reservation")
    } finally {
      clearRoomSelectorCache();
      setBookingPending(false);
      setHour(null);
    }
  }, [ethAddress, selectedHour, roomId, setBookingPending, clearRoomSelectorCache, setHour]);

  return { handleApplyReservation, handleCancelReservation, ethAddress, cancellationsPending, bookingPending, setHour, time };
}

export { useBookingTransactionsSync };