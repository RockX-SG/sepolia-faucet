import React from 'react';
import Animate from 'rc-animate';
import LinkBgImages from '../../images/link-bg.png';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import { ReactComponent as ETHIcon } from '../../images/eth.svg';
interface TipProps {
  show: boolean;
  showFixedTip: boolean;
}
const Tip = ({ show, showFixedTip }: TipProps) => {
  return (
    <Animate transitionLeave={false} transitionName="rockx-fade">
      {show && showFixedTip && (
        <div className="text-white fixed right-10 2xl:right-20 bottom-20 w-[268px] h-[216px] rounded-lg overflow-hidden">
          <div className="w-full h-full absolute top-0 left-0 px-6 py-8">
            <div className="flex">
              <ETHIcon />
              <div className="ml-3">
                Get node access and build your dApp on:
              </div>
            </div>
            <div className="mt-4 text-[#1C3067] space-y-2 w-full">
              <a
                className="flex space-x-2 items-center py-[6px] px-3 rounded-lg bg-opacity-25 bg-white transition-all hover:bg-opacity-50"
                href="https://access.rockx.com/product/ethereum-blockchain-api-for-web3-builders"
              >
                <ArrowIcon />
                <span>Ethereum Mainnet</span>
              </a>
              <a
                className="flex space-x-2 items-center py-[6px] px-3 rounded-lg bg-opacity-25 bg-white transition-all hover:bg-opacity-50"
                href="https://access.rockx.com/product/ethereum-sepolia-testnet-blockchain-api-for-web3-builders"
              >
                <ArrowIcon />
                <span>Ethereum Sepolia Testnet</span>
              </a>
            </div>
          </div>
          <div className="w-full h-full">
            <img src={LinkBgImages} className="block w-full h-full" alt="" />
          </div>
        </div>
      )}
    </Animate>
  );
};

export default Tip;
