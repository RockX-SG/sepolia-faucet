import React, { useEffect, useState, useRef } from 'react';
import { Message } from '@arco-design/web-react';
import { RequestType } from '../../../../interface/blockRes';
import dayjs from 'dayjs';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(dayjsRelativeTime);
const SITE_KEY = '6LdbkIggAAAAAAhemSXLKtAQayPC-YHfs2kiT0N_';
const Faucet = () => {
  const [peers, setPeers] = useState(0);
  const [funds, setFunds] = useState(0);
  const [blocks, setBlocks] = useState(0);
  const [funded, setFunded] = useState(0);
  const [url, setUrl] = useState('');
  const serverRef = useRef<WebSocket>();
  const [pendingRequsets, setPendingRequests] = useState<RequestType[]>([]);
  const onSend = (e: any) => {
    e.preventDefault();
    window.grecaptcha.ready(() => {
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
      <div className="text-white  rounded-xl bg-[#1E2949] mt-10 mx-2 lg:mt-20 lg:w-[800px] lg:mx-auto">
        <div className="p-4 lg:p-8">
          <div className="sm:flex">
            <div className="sm:flex-1 border-2 border-[#5442A7] rounded-lg flex items-center">
              <input
                type="text"
                className="bg-[transparent] block px-4 w-full h-12 text-white placeholder:text-white"
                placeholder="Enter the URL containing your ETH address"
                value={url}
                onChange={e => setUrl(e.target.value)}
              />
            </div>
            <button
              onClick={onSend}
              className="w-full btn mt-4 sm:mt-0 sm:w-auto sm:ml-4  rounded-lg text-white bg-[#5442A7] py-3 px-4 text-center font-bold"
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
            <div className="font-medium opacity-50">Ethers</div>
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
