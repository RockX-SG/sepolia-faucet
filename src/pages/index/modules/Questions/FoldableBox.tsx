import React, { useState } from 'react';
import { ReactComponent as ArrowIcon } from '../../../../assets/icons/arrow.svg';

interface FoldableBoxProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
}
const FoldableBox = ({ title, children, isOpen = false }: FoldableBoxProps) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <div className="bg-[#1E2A49] rounded-xl  ">
      <div
        onClick={() => setOpen(prevState => !prevState)}
        className="py-4 px-4 md:py-8 md:px-8 text-white cursor-pointer font-bold text-xl flex items-center"
      >
        {title}
        <ArrowIcon
          className={`ml-auto transform ${!open ? 'rotate-180' : ''}`}
        />
      </div>
      {open && (
        <>
          <div className="mx-4 md:mx-8  pl-2 md:pl-4 border-l-4 border-[#5741BC] text-sm md:text-base text-white opacity-60 space-y-4 md:space-y-8">
            {children}
          </div>
          <div className="pb-4 md:pb-8"></div>
        </>
      )}
    </div>
  );
};
export default FoldableBox;
