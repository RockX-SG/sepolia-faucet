import React, { useState } from 'react';
import * as Yup from 'yup';
import request from '../../utils/request';
import useSWRMutation from 'swr/mutation';
import { Message } from '@arco-design/web-react';
import { ReactComponent as TwitterIcon } from '../../assets/icons/twitter.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as TelegramIcon } from '../../assets/icons/telegram.svg';
import { ReactComponent as MediumIcon } from '../../assets/icons/medium.svg';
import bgImage from './images/BG.png';
import mobileBgImage from './images/mobile-BG.png';
const emailSchema = Yup.string()
  .email('Invalid email address')
  .required('Email is required');
const Footer = () => {
  const [email, setEmail] = useState('');
  const { trigger, isMutating } = useSWRMutation(
    'https://rockx-web-be.herokuapp.com/contacts/subscribe',
    (url, { arg }) => request.post(url, arg)
  );
  const onSubscribe = () => {
    emailSchema
      .validate(email)
      .then(async email_id => {
        try {
          const res = await trigger({
            email_id,
            tags: ['sepolia-faucet-footer'],
          });
          if (res?.data?.data === 'success') {
            Message.success('Email successfully subscribed!');
          }
        } catch (e) {
          Message.error('Internal error while subscribing!');
        }
      })
      .catch(error => {
        Message.error(error.errors[0]);
      });
  };
  return (
    <>
      <div className="relative mt-8 sm:mt-14 md:mt-20 lg:mt-30">
        <img
          className="hidden md:block w-full"
          src={bgImage}
          alt="background"
        />
        <img
          className="md:hidden w-full"
          src={mobileBgImage}
          alt="background"
        />
        <div className="w-full absolute bottom-8 sm:bottom-20 md:bottom-8 lg:bottom-12 xl:bottom-20 2xl:bottom-28">
          <div className="text-center text-xl font-bold text-white sm:text-2xl lg:text-4xl ">
            Receive the latest updates and promotions
          </div>
          <div className="flex mx-4 mt-4 sm:mt-10 md:mt-6 md:max-w-[700px] md:mx-auto xl:mt-10">
            <div className="flex bg-white rounded-lg p-2 items-center flex-1 ">
              <input
                placeholder="Enter your email address"
                type="text"
                className="block px-2 flex-1 md:py-2"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
              <button
                onClick={onSubscribe}
                disabled={isMutating}
                className="rounded-full btn bg-[#43DDAC] text-white py-2 px-4 md:font-bold md:hidden"
              >
                Subscribe
              </button>
            </div>
            <button
              onClick={onSubscribe}
              disabled={isMutating}
              className="hidden btn rounded-xl bg-[#43DDAC] text-white py-2 px-4 font-bold md:block ml-4"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-auto bg-[#101C3D] px-4 py-24 xl:py-36">
        <div className="container mx-auto">
          <div className="text-xs sm:text-sm grid grid-cols-2 md:grid-cols-4 text-[#b5bccf] font-semibold">
            <div className="space-y-6 sm:space-y-4 mb-10 md:mb-0">
              <div className="mb-8 text-white font-extrabold">COMPANY</div>
              <div>
                <a
                  href="https://jobs.wrk.xyz/rockx"
                  className="hover:text-[#43ddac]"
                  target="_self"
                >
                  Careers
                </a>
              </div>
              <div>
                <a
                  href="https://www.rockx.com/contact"
                  className="hover:text-[#43ddac]"
                  target="_self"
                >
                  Contact Us
                </a>
              </div>
            </div>
            <div className="space-y-6 sm:space-y-4 mb-10 md:mb-0">
              <div className="mb-8 text-white font-extrabold">SERVICES</div>
              <div>
                <a
                  href="https://www.rockx.com/staking"
                  className="hover:text-[#43ddac]"
                  target="_self"
                >
                  Staking Service
                </a>
              </div>
              <div>
                <a
                  href="https://access.rockx.com/"
                  className="hover:text-[#43ddac]"
                  target="_self"
                >
                  Access Node API
                </a>
              </div>
            </div>
            <div className="space-y-6 sm:space-y-4 mb-10 md:mb-0">
              <div className="mb-8 text-white font-extrabold">LEARN</div>
              <div>
                <a
                  href="https://blog.rockx.com/"
                  className="hover:text-[#43ddac]"
                  target="_self"
                >
                  Blog
                </a>
              </div>
              <div>
                <a
                  href="https://help.rockx.com/"
                  className="hover:text-[#43ddac]"
                  target="_self"
                >
                  Help Center
                </a>
              </div>
              <div>
                <a
                  href="https://www.rockx.com/resources"
                  className="hover:text-[#43ddac]"
                  target="_self"
                >
                  Resources
                </a>
              </div>
              <div>
                <a
                  className="hover:text-[#43ddac]"
                  href="https://drive.google.com/file/d/1xZFxd9S0vjSewkfgJKaIywbDJe_gQZjo/view?usp=sharing"
                  target="_self"
                >
                  Security Litepaper
                </a>
              </div>
            </div>
            <div className="space-y-6 sm:space-y-4 mb-10 md:mb-0">
              <div className="mb-8 text-white font-extrabold">GET IN TOUCH</div>
              <div>Contact us anytime to get support.</div>
              <div>
                <a
                  className="text-[#43ddac] font-medium block my-4 text-base"
                  href="mailto:inquiry@rockx.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  inquiry@rockx.com
                </a>
              </div>
              <div className="flex flex-wrap">
                <a
                  href="https://www.linkedin.com/company/rockx-official"
                  target="_self"
                >
                  <div className="bg-[#5460EF] rounded-full w-10 h-10 border-box flex justify-center items-center p-1 mr-2 mb-2">
                    <LinkedinIcon className="text-white" />
                  </div>
                </a>
                <a href="https://twitter.com/rockx_official" target="_self">
                  <div className="bg-[#5460EF] rounded-full w-10 h-10 border-box flex justify-center items-center p-1 mr-2 mb-2">
                    <TwitterIcon className="text-white" />
                  </div>
                </a>
                <a href="https://t.me/rockxenglish" target="_self">
                  <div className="bg-[#5460EF] rounded-full w-10 h-10 border-box flex justify-center items-center p-1 mr-2 mb-2">
                    <TelegramIcon className="text-white" />
                  </div>
                </a>
                <a href="https://rockx.medium.com" target="_self">
                  <div className="bg-[#5460EF] rounded-full w-10 h-10 border-box flex justify-center items-center p-1 mr-2 mb-2">
                    <MediumIcon className="text-white" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
