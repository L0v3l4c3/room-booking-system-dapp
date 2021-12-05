import { nullAddress } from "../const";
import { RoomLookup } from "../types/Room";
import { EthAddress } from "../types/Web3";

class PersistentRoom implements RoomLookup {
  public readonly id: number;
  public readonly name: string;
  public availabilities: Map<number, EthAddress>;

  constructor(roomId: number, name: string, availabilities: Map<number, EthAddress>) {
    this.id = roomId;
    this.name = name;
    this.availabilities = availabilities;
  }

  public getBookedHours(address: EthAddress) {
    const unavailableHours: number[] = [];

    for (const [hour, occupant] of this.availabilities) {
      console.log(this.availabilities)
      if (occupant !== nullAddress) {
        unavailableHours.push(hour);
      }
    }

    return () => unavailableHours;
  }

  public getCancellableReservations(address: EthAddress) {
    const cancellableReservations: number[] = [];

    for (const [hour, occupant] of this.availabilities) {
      if (occupant === address) {
        cancellableReservations.push(hour);
      }
    }

    return cancellableReservations;
  }
}

export { PersistentRoom };