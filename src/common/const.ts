import Web3 from "web3";
import compiledBookingSystemContract from "../contracts/BookingSystem.json";
import { BookingSystemContract } from "../common/types/Web3";

const Web3Singleton = new Web3(Web3.givenProvider);
const bookingContract = new Web3Singleton.eth.Contract(compiledBookingSystemContract.abi as [], compiledBookingSystemContract.networks[3].address) as BookingSystemContract;
const nullAddress = "0x0000000000000000000000000000000000000000";

export { bookingContract, Web3Singleton, nullAddress };