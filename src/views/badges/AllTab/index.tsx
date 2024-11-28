import React, { useEffect, useState } from "react";
import { MintCard } from "@/components/Card";
import TransactionLoading from "@/components/Loaders/TransactionLoading";

const AllViewTab: React.FC<{ items: any, userID:any }> = ({ items, userID }) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <TransactionLoading size={60} color="#CAFC01" />
        </div>
      ) : (
        <>
          {items.length === 0 && (
            <p className="border border-main-200 rounded-lg inline-flex justify-center items-center w-full py-[100px] text-[30px] text-main-200 font-700 text-center desktop:text-[22px] font-space_grotesk">
              {"You don't have badges"}
            </p>
          )}
          <div className="grid grid-cols-4 desktop:grid-cols-3 tablet:grid-cols-2 small:grid-cols-1 gap-4 w-full place-items-center ">
            {items.length !== 0 &&
              items.map((item: any, index: number) => <MintCard {...item} userID={userID} key={`profile-gallery-${index}`} />)}
          </div>
        </>
      )}
    </>
  );
};

export default AllViewTab;
