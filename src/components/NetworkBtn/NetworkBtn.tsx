import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { Flex } from "..";
export const NetworkBtn = () => {
  return (
    <ConnectButton.Custom>
      {({ chain, openChainModal }) => {
        return (
          <div>
            {(() => {
              if (chain?.unsupported) {
                return (
                  <div>
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  </div>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Flex
                    action={openChainModal}
                    align="items-center"
                    justifyContent="justify-between"
                    className="flex-1 space-x-3 cursor-pointer hover:text-primary"
                  >
                    <span>{chain?.name}</span>
                    {chain?.hasIcon && (
                      <div
                        style={{
                          background: chain?.iconBackground,
                          width: 20,
                          height: 20,
                          borderRadius: 999,
                          overflow: "hidden"
                        }}
                      >
                        {chain.iconUrl && (
                          <Image width={20} height={20} alt={chain.name ?? "Chain icon"} src={chain.iconUrl} />
                        )}
                      </div>
                    )}
                  </Flex>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
export default NetworkBtn;
