import { useMemo } from 'react';
import { ethers } from 'ethers';
const useWeb3Provider = () => {
  return useMemo(() => {
    if (window.ethereum) {
      return new ethers.providers.Web3Provider(window.ethereum);
    }
  }, []);
};

export default useWeb3Provider;
