import React, { useState } from "react";
import { Flex, GradientText } from "..";

import { IoMdCloseCircle } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

const TwitterModal = ({
  showModal,
  setShowModal,
  domainName,
  postlink
}: {
  showModal: boolean;
  setShowModal: any;
  domainName: string;
  postlink: string;
}) => {
  const [value, setValue] = useState<string>("I am going to post " + postlink);

  const onHandleClose = () => {
    setShowModal(false);
  };

  const onPostTwitter = () => {
    setShowModal(false);
    toast.success("Posted successfully");
  };
  return (
    <div
      className={`border fixed h-full w-full transition-all duration-300 z-[500] left-0 top-0 bg-black/60 flex justify-center items-center ${showModal ? "visible opacity-100 backdrop-blur-2xl" : "invisible opacity-0"}`}
    >
      <div className="absolute bg-main-100 p-8 rounded-xl w-[450px] small:w-[80%]">
        <IoMdCloseCircle
          onClick={onHandleClose}
          className="absolute w-[30px] h-[30px] -right-7 -top-7 cursor-pointer"
        />

        <Flex direction="flex-col" justifyContent="justify-between" align="items-center" className="space-y-5">
          <div className="text-[25px] font-500 text-center">
            <GradientText>{domainName || "Domain Name"}</GradientText>
          </div>
          <textarea
            onChange={(e) => setValue(e.target.value)}
            className="bg-main-200 w-full  h-[200px] rounded-3xl p-3"
            value={value}
          />
          <button
            onClick={onPostTwitter}
            className=" bg-primary text-black w-[60%] px-6 py-2 rounded-3xl text-[18px] font-500"
          >
            Post <span className="small:hidden">to Twitter</span>
          </button>
        </Flex>
      </div>
      <Toaster />
    </div>
  );
};

export default TwitterModal;
