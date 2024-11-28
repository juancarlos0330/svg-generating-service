import React from "react";

import { IoMdCloseCircle } from "react-icons/io";
import CheckoutSection from "@/views/cart/Checkout";

const CheckoutModal = ({ showModal, setShowModal }: { showModal: boolean; setShowModal: any }) => {
  const onHandleClose = () => {
    setShowModal(false);
  };
  return (
    <div
      className={`border fixed h-full w-full transition-all duration-300 z-[500] left-0 top-0 bg-black/60 flex justify-center items-center ${showModal ? "visible opacity-100 backdrop-blur-2xl" : "invisible opacity-0"}`}
    >
      <div className="absolute">
        <IoMdCloseCircle
          onClick={onHandleClose}
          className="absolute w-[30px] h-[30px] -right-7 -top-7 cursor-pointer mobile:-right-1 mobile:-top-8"
        />

        <CheckoutSection />
      </div>
    </div>
  );
};

export default CheckoutModal;
