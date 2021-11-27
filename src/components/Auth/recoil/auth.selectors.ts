import Web3 from "web3";
import { selector } from "recoil";
import { EthAddress } from "../../../common/types/Web3";
import { enableWeb3 } from "../../../common/utils/enableWeb3";

const Web3AccountSelector = selector<EthAddress>({
  key: "account-state-selector",
  get: async () => {
    return Web3.utils.toChecksumAddress(await enableWeb3());
  }
});

export { Web3AccountSelector };