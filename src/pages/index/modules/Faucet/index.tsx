import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Message } from '@arco-design/web-react';
import { RequestType } from '../../../../interface/blockRes';
import dayjs from 'dayjs';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import LinkBgImages from '../../images/link-bg.png';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import { ReactComponent as ETHIcon } from '../../images/eth.svg';
dayjs.extend(dayjsRelativeTime);
const SITE_KEY = '6LdbkIggAAAAAAhemSXLKtAQayPC-YHfs2kiT0N_';
interface FaucetProps {
  showFixedTip: boolean;
}
const Faucet = ({ showFixedTip }: FaucetProps) => {
  const [peers, setPeers] = useState(0);
  const [funds, setFunds] = useState(0);
  const [blocks, setBlocks] = useState(0);
  const [funded, setFunded] = useState(0);
  const [url, setUrl] = useState('');
  const serverRef = useRef<WebSocket>();
  const [pendingRequsets, setPendingRequests] = useState<RequestType[]>([]);

  const ETHIsZero = useMemo(() => funds === 0, [funds]);
  const onSend = (e: any) => {
    e.preventDefault();
    window.grecaptcha?.ready(() => {
      window.grecaptcha
        .execute(SITE_KEY, { action: 'submit' })
        .then((token: string) => {
          serverRef.current?.send(
            JSON.stringify({
              url,
              tier: 0,
              captcha: token,
            })
          );
          window.grecaptcha.reset();
        });
    });
  };
  // connect socket
  useEffect(() => {
    const connect = () => {
      serverRef.current = new WebSocket('wss://faucet-sepolia.rockx.com/api');
      serverRef.current.onmessage = event => {
        try {
          const msg = JSON.parse(event.data);
          if (msg === null) return;
          if (msg.funded) {
            setFunded(msg.funded);
          }
          if (msg.peers) {
            setPeers(msg.peers);
          }
          if (msg.funds) {
            setFunds(msg.funds);
          }
          if (msg.number) {
            setBlocks(parseInt(msg.number, 16));
          }
          if (msg.requests?.length >= 0) {
            setPendingRequests(msg.requests);
          }
          if (msg.error !== undefined) {
            Message.error(msg.error);
          }
          if (msg.success !== undefined) {
            Message.success(msg.success);
          }
        } catch (e) {}
      };
      serverRef.current.onclose = () => {
        setTimeout(connect, 3000);
      };
    };
    connect();
  }, []);
  // load Google reCaptcha
  useEffect(() => {
    const loadScriptByURL = (id: string, url: string) => {
      const isScriptExist = document.getElementById(id);
      if (!isScriptExist) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = id;
        document.body.appendChild(script);
      }
    };
    loadScriptByURL(
      'recaptcha-key',
      `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
    );
  }, []);

  return (
    <div className="container mx-auto mt-20 md:mt-40">
      <div className="text-white text-center text-2xl md:text-[44px] font-semibold">
        RockX Sepolia Testnet Faucet
      </div>
      <div className="text-white relative rounded-xl bg-[#1E2949] mx-2 mt-10 lg:mt-16 lg:w-[800px] lg:mx-auto">
        <div className="p-4 lg:p-8">
          <div className="sm:flex">
            <div className="sm:flex-1 border-2 border-[#5442A7] rounded-lg flex items-center">
              <input
                type="text"
                className="bg-[transparent] block px-4 w-full h-12 text-white font-medium placeholder:text-white placeholder:font-medium"
                placeholder="Paste the tweet URL here"
                value={url}
                onChange={e => setUrl(e.target.value)}
                disabled={ETHIsZero}
              />
            </div>
            <button
              onClick={onSend}
              disabled={ETHIsZero}
              className={`w-full btn mt-4 sm:mt-0 sm:w-auto sm:ml-4 rounded-lg text-white  py-3 px-4 text-center font-bold ${
                ETHIsZero
                  ? 'bg-[#485673] cursor-not-allowed transpar'
                  : 'bg-[#5442A7] cursor-pointer'
              }`}
            >
              Send Me ETH
            </button>
          </div>
          <div className="font-bold opacity-50 text-base mt-4 sm:flex sm:space-x-2">
            <div>Sepolia RPC Endpoint :</div>
            <div>https://rpc-sepolia.rockx.com</div>
          </div>
        </div>
        <div className="border-t border-dotted opacity-40"></div>
        <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-4 py-4 px-8 lg:py-8 lg:px-12">
          <div>
            <div className="font-medium opacity-50">Peers</div>
            <div className="font-bold text-lg text-[#E1E2E6]">
              {peers.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="font-medium opacity-50">Blocks</div>
            <div className="font-bold text-lg text-[#E1E2E6]">
              {blocks.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="font-medium opacity-50">
              {ETHIsZero ? 'Remaining Balance' : 'Ethers'}
            </div>
            <div className="font-bold text-lg text-[#E1E2E6]">
              {funds.toLocaleString()} ETH
            </div>
          </div>
          <div>
            <div className="font-medium opacity-50">Institutions Funded</div>
            <div className="font-bold text-lg text-[#E1E2E6]">
              {funded.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      {!showFixedTip && (
        <div className="mt-6 mx-2 h-[216px] lg:mt-12 lg:w-[800px] lg:mx-auto relative rounded-xl overflow-hidden">
          <div className="w-full h-full absolute top-0 left-0 px-6 py-8">
            <div className="flex items-center text-white text-base">
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
                href="https://access.rockx.com/product/ethereum-testnet-blockchain-api-for-web3-builders"
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

      {pendingRequsets.length > 0 && (
        <div className="text-white p-4 overflow-auto flex bg-[#172343] lg:p-8 rounded-xl mt-6 mx-2 lg:mt-12 lg:w-[800px] lg:mx-auto">
          <div className="flex-1 space-y-4">
            <div className="text-lg font-bold">Pending Transactions</div>
            {pendingRequsets.map(item => (
              <div className="opacity-50" key={item.account}>
                {item.account}
              </div>
            ))}
          </div>
          <div className="min-w-[180px] ml-4 sm:ml-0 sm:block space-y-4">
            <div className="text-lg font-bold">Time</div>
            {pendingRequsets.map(item => (
              <div className="opacity-50" key={item.account}>
                {dayjs().to(dayjs(item.time))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Faucet;
