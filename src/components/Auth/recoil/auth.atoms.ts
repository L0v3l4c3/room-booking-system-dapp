import { atom } from "recoil";
import { Company } from "../../../common/types/Company";
import { EthAddress } from "../../../common/types/Web3";
import { Web3AccountSelector } from "./auth.selectors";

const Web3AccountState = atom<EthAddress>({
  key: "account-state",
  default: Web3AccountSelector
});

const UserCompanyState = atom<Company | undefined>({
  key: "user-company-state",
  default: undefined
});

export { Web3AccountState, UserCompanyState };