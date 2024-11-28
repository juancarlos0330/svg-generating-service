import { useChainModal } from "@rainbow-me/rainbowkit";
import { Flex } from "@/components";

export default function WrongChainModal() {
  const { openChainModal } = useChainModal();
  return (
    <div
      className={
        "fixed h-full w-full transition-all duration-300 z-[500] left-0 top-0 bg-black/60 flex justify-center items-center visible opacity-100 backdrop-blur-2xl"
      }
    >
      <div className="absolute bg-main-100 p-8 rounded-xl w-[450px] small:w-[80%]">
        <Flex direction="flex-col" justifyContent="justify-between" className="space-y-5">
          <div className="text-left">
            In our testing phase we only support a few <br />
            <span className="text-primary">Selected Networks</span>
          </div>
          <div className="text-left">
            It looks like you are connected to an <div className="text-danger">Unsupported network</div>
          </div>
          {openChainModal && (
            <button
              onClick={() => openChainModal()}
              className="w-full bg-primary text-black rounded-3xl p-2 text-[20px] small:text-[16px] font-400"
            >
              Switch Chain
            </button>
          )}
        </Flex>
      </div>
    </div>
  );
}
