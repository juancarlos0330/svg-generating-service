import React from "react";
import { Flex } from "..";
import { IoMdCloseCircle } from "react-icons/io";
import { useGetDomainTLD } from "@/utils/web3/hooks/useGetDomainTLD";

const ViewDomainModal = ({
  showModal,
  setShowModal,
  domainSvg,
  domainName,
  tokenId,
  registrant,
  expirationDate,
  isPrimary
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  domainSvg: string | null;
  domainName: string;
  tokenId: number;
  registrant: string;
  expirationDate: string;
  isPrimary: boolean | undefined;
}) => {
  const onHandleClose = () => {
    setShowModal(false);
  };

  const TLD = useGetDomainTLD();

  // TODO: get an alternative for dangerouslySetInnerHTML
  const SVGComponent = ({ svgString }: { svgString: SVGRectElement }) => (
    <svg
      viewBox="0 0 160 160"
      className="w-[150px] h-[150px] shrink-0 rounded-full object-top"
      dangerouslySetInnerHTML={{
        __html: svgString as unknown as string
      }}
    />
  );

  return (
    <div
      className={`fixed h-full w-full transition-all duration-300 z-[500] left-0 top-0 bg-black/60 flex justify-center items-center ${showModal ? "visible opacity-100 backdrop-blur-2xl" : "invisible opacity-0"}`}
    >
      <div className="absolute bg-main-100 p-8 rounded-xl w-[450px] small:w-[80%]">
        <IoMdCloseCircle
          onClick={onHandleClose}
          className="absolute w-[30px] h-[30px] -right-7 -top-7 cursor-pointer"
        />

        <Flex direction="flex-col" justifyContent="justify-between" align="items-center" className="space-y-5">
          {/* SVG Component */}
          <SVGComponent svgString={domainSvg as unknown as SVGRectElement} />
          <div className="text-center">
            <div className="break-all text-[38px] small:text-[26px] font-500 w-full text-center inline bg-primary_gradient_text bg-clip-text text-transparent">
              {`${domainName}.${TLD}`}
            </div>
            <br />
            {isPrimary && (
              <p className="inline-flex text-center items-center border-[0.5px] border-verified/60 rounded-xl text-[12px] font-500 px-2 py-[2px]">
                {"Primary"}
              </p>
            )}
          </div>
          <Flex direction="flex-col" className="w-full space-y-3">
            <Flex justifyContent="justify-between" align="items-center">
              <p className="text-[20px]  small:text-[16px] text-main-400">Token id</p>
              <p className="text-[20px]  small:text-[16px] font-500">{tokenId}</p>
            </Flex>
            <Flex justifyContent="justify-between" align="items-center">
              <p className="text-[20px]  small:text-[16px] text-main-400">Registrant</p>
              <p className="text-[20px]  small:text-[16px] font-500">
                {registrant ? `${registrant.slice(0, 4)}...${registrant.slice(-5)}` : ""}
              </p>
            </Flex>
            <Flex justifyContent="justify-between" align="items-center">
              <p className="text-[20px]  small:text-[16px] text-main-400">Expiration</p>
              <p className="text-[20px]  small:text-[16px] font-500">{expirationDate}</p>
            </Flex>
          </Flex>
          <button
            onClick={onHandleClose}
            className="w-full bg-primary text-black rounded-3xl p-2 text-[20px] small:text-[16px] font-400"
          >
            Close
          </button>
        </Flex>
      </div>
    </div>
  );
};

export default ViewDomainModal;
