import GalleryCard from "@/components/Card/GalleryCard";
import TransactionLoading from "@/components/Loaders/TransactionLoading";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Network, Alchemy, NftFilters } from "alchemy-sdk";

interface NFTDetails {
  src: string;
  name: string;
  collection?: string | undefined;
}

const config = {
  apiKey: "8NWdTWUdhTZIbKUT3uC_4wb-3qWu782D", // Replace with your Alchemy API Key.
  network: Network.MATIC_MAINNET // Replace with your network.
};

const alchemy = new Alchemy(config);

const GalleryView = ({ setGalleryCount }: { setGalleryCount: React.Dispatch<React.SetStateAction<number>> }) => {
  const { address } = useAccount();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [userNfts, setUserNfts] = useState<NFTDetails[]>([]);
  setGalleryCount(userNfts.length);

  useEffect(() => {
    if (address) {
      const fetchNFTs = async () => {
        const nfts = await alchemy.nft.getNftsForOwner(address, {
          // excludeFilters: [NftFilters.AIRDROPS]
        });

        console.log(nfts);

        const nftInfo = nfts.ownedNfts
          .filter(
            (nft: any) =>
              nft.image && nft.image.cachedUrl && (nft.tokenType !== "ERC1155" || nft.image.contentType === "image/gif")
          )
          .map((nft: any) => ({
            src: nft.image.cachedUrl,
            name: nft.name ?? "",
            collection: nft.collection?.name
          }));
        console.log(nftInfo);
        setUserNfts(nftInfo);
        setLoading(false);
      };

      fetchNFTs();
    }
  }, [address]);

  return (
    <div className="flex items-center justify-center">
      {isLoading && <TransactionLoading size={60} color="#CAFC01" />}
      {!isLoading && (
        <>
          {userNfts.length === 0 && (
            <p className="border border-main-200 rounded-lg inline-flex justify-center items-center w-full py-[100px] text-[30px] text-main-200 font-700 text-center desktop:text-[22px] font-space_grotesk">
              {"You don't have any Gallery"}
            </p>
          )}
          <div className="grid grid-cols-4 desktop:grid-cols-3 tablet:grid-cols-2 small:grid-cols-1 gap-4 w-full place-items-center ">
            {userNfts.map((item, index) => (
              <GalleryCard
                src={item.src}
                name={item.name}
                key={`profile-gallery-${index}`}
                count={item.collection ?? ""}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GalleryView;
