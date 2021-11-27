import { Company } from "./Company";
import { RoomLookup } from "./Room";

type EthAddress = string;

interface Contract<M> {
  methods: MethodsInterface<M>;
}

type TrxOpts = {
  from: string;
}

type MethodsInterface<M> = {
  [K in keyof M]: M[K] extends (...args: infer A) => infer RType ? (...args: A) => {
    send: (opts?: TrxOpts) => RType;
    call: (opts?: TrxOpts) => RType;
  } : never
}

type BookingSystemContractInterface = {
  Users: (address: EthAddress) => Promise<Company>;
  Rooms: (roomId: number) => Promise<RoomLookup>;
  availabilities: (roomId: number, hour: number) => Promise<EthAddress>;
  assignToCompany: (company: Company) => Promise<void>;
  applyReservation: (roomId: number, hour: number) => Promise<void>;
  cancelReservation: (roomId: number, hour: number) => Promise<void>;
}

interface BookingSystemContract extends Contract<BookingSystemContractInterface> { }

export type { BookingSystemContract, Contract, EthAddress };