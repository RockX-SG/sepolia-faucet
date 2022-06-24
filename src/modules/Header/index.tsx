import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Drawer } from '@arco-design/web-react';
import { Message } from '@arco-design/web-react';
import useWeb3Ethereum from '../../data/useWeb3Ethereum';
import useWeb3Provider from '../../data/useWeb3Provider';
import { CHAIN_ID } from '../../constants';
import { ReactComponent as RockXIcon } from '../../assets/images/rockx.svg';
import { ReactComponent as DiscordIcon } from '../../assets/icons/discord.svg';
import { ReactComponent as TwitterIcon } from '../../assets/icons/twitter.svg';
import { ReactComponent as MenuIcon } from '../../assets/icons/menu.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as TelegramIcon } from '../../assets/icons/telegram.svg';
import { ReactComponent as MediumIcon } from '../../assets/icons/medium.svg';
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg';
const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const ethereum = useWeb3Ethereum();
  const provider = useWeb3Provider();
  const links = useMemo(
    () => [
      {
        label: 'Home',
        url: 'https://www.rockx.com/',
        target: '_blank',
      },
      {
        url: 'https://www.rockx.com/staking',
        label: 'Staking',
        target: '_blank',
      },
      {
        url: 'https://access.rockx.com/',
        label: 'Access Node',
        target: '_blank',
      },
      {
        url: 'https://blog.rockx.com/',
        label: 'Blog',
        target: '_blank',
      },
    ],
    []
  );
  const addChain = async () => {
    if (ethereum) {
      const network = await provider?.getNetwork();
      if (network?.chainId === CHAIN_ID) {
        Message.warning('Sepolia Network has already been added to Metamask.');
      } else {
        const params = [
          {
            chainId: `0x${CHAIN_ID.toString(16)}`,
            chainName: 'Sepolia',
            nativeCurrency: {
              name: 'SEP',
              symbol: 'SEP',
              decimals: 18,
            },
            rpcUrls: ['https://rpc-sepolia.rockx.com'],
            // rpcUrls: ['https://rpc.sepolia.dev'],
            blockExplorerUrls: ['https://sepolia.etherscan.io'],
          },
        ];
        ethereum
          .request({ method: 'wallet_addEthereumChain', params })
          // .then(msg => {
          //   Message.success('Added successfully');
          // })
          .catch(error => Message.error(error.message));
      }
    } else {
      Message.warning('Please download the metaMask extension first');
    }
  };
  return (
    <div className="sticky top-0 shadow-xl z-50 bg-[#111D3C]">
      <div className="container mx-auto">
        <div className="py-3 flex justify-between items-center px-4 md:py-6">
          <Link to="/" className="mr-2">
            <RockXIcon className="w-40" />
          </Link>
          <ul className="hidden lg:flex items-center space-x-8 flex-1 px-8">
            {links.map((link, i) => (
              <li key={i} className="ml-auto">
                <a
                  href={link.url}
                  target={link.target}
                  className={classNames(
                    'text-white text-base font-medium p-2 leading-10 whitespace-nowrap'
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex text-white items-center mr-8">
            <div className="mr-6">
              <a
                href="https://twitter.com/rockx_official"
                rel="noreferrer"
                target="_blank"
                className="flex justify-center items-center w-10 h-10 rounded-full transition-all hover:bg-[rgba(255,255,255,0.08)] "
              >
                <TwitterIcon className="text-white" />
              </a>
            </div>
            <a
              href="https://discord.com/invite/YJzs4UwsTp"
              rel="noreferrer"
              target="_blank"
              className="flex justify-center items-center w-10 h-10 rounded-full transition-all hover:bg-[rgba(255,255,255,0.08)] "
            >
              <DiscordIcon className="w-6 h-6 text-white" />
            </a>
          </div>
          <div className="hidden lg:block ml-auto">
            <button
              onClick={addChain}
              className="rounded btn text-[#101C3D] bg-[#42ddac] py-3 px-4 flex items-center"
            >
              <AddIcon />
              <span className="mr-2 font-bold ml-2">Add To Metamask</span>
            </button>
          </div>
          <div
            onClick={() => setDrawerVisible(true)}
            className="block ml-8 lg:ml-0 lg:hidden p-2 cursor-pointer"
          >
            <MenuIcon className="w-5 h-5" />
          </div>
        </div>
        <Drawer
          width={332}
          visible={drawerVisible}
          footer={null}
          onOk={() => {
            setDrawerVisible(false);
          }}
          onCancel={() => {
            setDrawerVisible(false);
          }}
        >
          <div>
            <ul>
              {links.map((link, i) => (
                <li key={i} className="ml-auto pl-2">
                  <a
                    href={link.url}
                    target="_self"
                    className={classNames(
                      'text-[#a0a4a8] text-base block w-full font-medium  leading-[50px] whitespace-nowrap hover:text-[#416ff4]'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pl-2 py-6">
              <a
                href="https://twitter.com/rockx_official"
                rel="noreferrer"
                target="_self"
              >
                <TwitterIcon className="w-10 h-10 text-[#02A9F4]" />
              </a>
            </div>
            <div>
              <a
                href="https://discord.com/invite/YJzs4UwsTp"
                rel="noreferrer"
                target="_self"
              >
                <button className="rounded btn text-white bg-[#5460EF] py-3 px-4 flex justify-center items-center w-full">
                  <span className="mr-2 font-bold">Join Discord</span>
                  <DiscordIcon className="w-5 h-5 text-white" />
                </button>
              </a>
            </div>
            <div className="h-[1px] bg-gray-200 my-10"></div>
            <div>
              <div className="text-base text-black font-bold">Contact Us</div>
              <div className="text-[#687497] text-sm pt-2">
                Contact us anytime to get support.
              </div>
              <a
                className="text-[#43ddac] font-medium block my-4 text-base"
                href="mailto:inquiry@rockx.com"
                target="_blank"
                rel="noreferrer"
              >
                <span>inquiry@rockx.com</span>
              </a>
            </div>
            <div className="flex">
              <a
                href="https://www.linkedin.com/company/rockx-official"
                target="_self"
              >
                <div className="bg-[#5460EF] rounded-full w-10 h-10 border-box flex justify-center items-center p-1 mr-2">
                  <LinkedinIcon className="text-white" />
                </div>
              </a>
              <a href="https://twitter.com/rockx_official" target="_self">
                <div className="bg-[#5460EF] rounded-full w-10 h-10 border-box flex justify-center items-center p-1 mr-2">
                  <TwitterIcon className="text-white" />
                </div>
              </a>
              <a href="https://t.me/rockxenglish" target="_self">
                <div className="bg-[#5460EF] rounded-full w-10 h-10 border-box flex justify-center items-center p-1 mr-2">
                  <TelegramIcon className="text-white" />
                </div>
              </a>
              <a href="https://rockx.medium.com" target="_self">
                <div className="bg-[#5460EF] rounded-full w-10 h-10 border-box flex justify-center items-center p-1 mr-2">
                  <MediumIcon className="text-white" />
                </div>
              </a>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
