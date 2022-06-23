import { MetaMaskInpageProvider } from '@metamask/providers';
type Ethereumish = MetaMaskInpageProvider | undefined;
/**
 * ethereum
 */
export default function useWeb3Ethereum() {
  const ethereum = window.ethereum;
  return ethereum as Ethereumish;
}
