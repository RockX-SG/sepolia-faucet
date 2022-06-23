import React from 'react';
import FoldableBox from './FoldableBox';
import { ReactComponent as TwitterIcon } from '../../../../assets/icons/twitter.svg';
import { ReactComponent as FBIcon } from '../../../../assets/icons/fb.svg';
const Questions = () => {
  return (
    <div className="mx-auto container">
      <div className="mt-10 mx-2 lg:mt-16 lg:w-[800px] lg:mx-auto">
        <div className="font-bold text-2xl text-white">
          Frequently asked questions
        </div>
        <div className="space-y-4 mt-6 md:space-y-8 md:mt-10">
          <FoldableBox title="How dose this work?">
            <div>
              This faucet is running on the RockX Sepolia network. To prevent
              malicious actors from exhausting all available funds or
              accumulating enough Ether to mount long running spam attacks,
              requests are tied to common 3rd party social network accounts.
              Anyone having a Twitter or Facebook account may request funds
              within the permitted limits.
            </div>
            <div className="flex items-start">
              <TwitterIcon className="text-white opacity-60 mt-2 md:w-8 md:h-8" />
              <div className="flex-1 ml-2 md:ml-4">
                To request funds via Twitter, make a{' '}
                <a
                  className="text-[#43ddac] font-medium my-4 text-base"
                  href="https://twitter.com/intent/tweet?text=Requesting%20faucet%20funds%20into%200x0000000000000000000000000000000000000000%20on%20the%20%23Rinkeby%20%23Ethereum%20test%20network."
                  target="_blank"
                  rel="noreferrer"
                >
                  tweet
                </a>{' '}
                with your Ethereum address pasted into the contents (surrounding
                text doesn't matter). Copy-paste the{' '}
                <a
                  className="text-[#43ddac] font-medium my-4 text-base"
                  href="https://support.twitter.com/articles/80586"
                  target="_blank"
                  rel="noreferrer"
                >
                  tweets URL
                </a>{' '}
                into the above input box and fire away!
              </div>
            </div>
            <div className="flex items-start">
              <FBIcon className="text-white opacity-60 mt-2 md:w-8 md:h-8" />
              <div className="flex-1 ml-2 md:ml-4">
                To request funds via Facebook, publish a new public post with
                your Ethereum address embedded into the content (surrounding
                text doesn't matter). Copy-paste the{' '}
                <a
                  className="text-[#43ddac] font-medium my-4 text-base"
                  href="https://www.facebook.com/help/community/question/?id=282662498552845"
                  target="_blank"
                  rel="noreferrer"
                >
                  posts URL
                </a>{' '}
                into the above input box and fire away!
              </div>
            </div>
          </FoldableBox>
          <FoldableBox title="What is the Sepolia testnet?">
            <div>
              Sepolia is a proof-of-work (PoW) testnet where developers can test
              their dApps. Sepolia differs from other Ethereum testnets in that
              most of its PoW validators are public. As Sepolia is a testnet,
              this also presents the possibility that some validators may stop
              validating, resulting in the chain failing to finalize. This makes
              Sepolia one of the best testnets for examining how decentralized
              systems perform under adverse circumstances.
            </div>
          </FoldableBox>
          <FoldableBox title="Who is RockX?">
            <div>
              RockX is a blockchain fintech company that helps our customers
              embrace web 3.0 effortlessly through the development of innovative
              products and infrastructure. We strive to enable institutions and
              disruptors in the financial and internet sectors to gain seamless
              access to blockchain data, crypto yield products, and
              best-in-class key management solutions in a sustainable way.
            </div>
          </FoldableBox>
          <FoldableBox title="Why RockX?">
            <div>
              With a stacked team of tech experts, we’ve been working on
              blockchain projects since 2019, providing a safe and secure
              technological infrastructure to support the most innovative
              protocols in the market. We have over $900M assets staked,
              providing $90M in annual yield and are partnered with some of the
              leading firms in digital assets, Matrixport, Amber Group, and
              more.
            </div>
          </FoldableBox>
        </div>
      </div>
    </div>
  );
};

export default Questions;
