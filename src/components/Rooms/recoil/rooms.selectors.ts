import Web3 from "web3";
import { selectorFamily } from "recoil";
import { bookingContract } from "../../../common/const";
import { PersistentRoom } from "../../../common/entities/Room";

const RoomQueriesSelector = selectorFamily<PersistentRoom, number>({
  key: "room-queries-selector",
  get: (roomId: number) => async () => {
    const room = await bookingContract.methods.Rooms(roomId).call();

    const availabilitiesRequestPool = [];

    for (let i = 0; i <= 23; i++) availabilitiesRequestPool.push(bookingContract.methods.availabilities(roomId, i).call());

    const availabilities = await Promise.all(availabilitiesRequestPool);

    const availabilitiesMap = new Map(
      Object.entries(availabilities)
        .map(([hour, occupant]) => [Number(hour), Web3.utils.toChecksumAddress(occupant)])
    );

    return new PersistentRoom(roomId, room.name, availabilitiesMap);
  }
})

export { RoomQueriesSelector };