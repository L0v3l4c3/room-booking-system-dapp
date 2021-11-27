enum Web3Method {
  REQUEST_ACCOUNTS = "eth_requestAccounts"
};

interface EthereumInterface {
  ethereum: {
    request: <T>({ method }: { method: Web3Method }) => Promise<T>
  }
}

type Web3InjectedWindow = Window & typeof globalThis & EthereumInterface;

const enableWeb3 = async () => {
  const _injectedWindow = window as Web3InjectedWindow;

  const [account] = await _injectedWindow.ethereum.request<string[]>({ method: Web3Method.REQUEST_ACCOUNTS });

  return account;
}

export { enableWeb3 };