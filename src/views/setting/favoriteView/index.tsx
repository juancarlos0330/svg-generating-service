import React, { useEffect, useState } from "react";
import { GradientText } from "@/components";
import { FollowerItem } from "@/components/Item/FollowerItem";
import clsx from "clsx";
import { useContextFavorite } from "@/contexts/FavoriteProvider";

const FavoriteView = () => {
  const { favorite } = useContextFavorite();
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);

  useEffect(() => {
    let items = JSON.parse(favorite);
    setFavoriteItems(items);
  }, [favorite]);

  return (
    <div className="w-full">
      <div className="uppercase text-[36px] font-500 font-space_grotesk border-b-2 border-primary/30 pb-3">
        <GradientText className="relative">
          {`favorites`}
          {favoriteItems.length != 0 && (
            <span className="absolute text-primary border border-primary/50 rounded-2xl -top-2 text-[12px] px-2">
              {favoriteItems.length}
            </span>
          )}
        </GradientText>
      </div>
      <div
        className={clsx(
          "flex-col pt-5 space-y-4",
          favoriteItems.length !== 0 && "desktop:space-y-0 desktop:grid desktop:grid-cols-3 desktop:gap-4",
          favoriteItems.length !== 0 && "laptop:grid-cols-1"
        )}
      >
        {favoriteItems.length === 0 && (
          <p className="border border-main-200 rounded-lg inline-flex justify-center items-center w-full py-[100px] text-[30px] text-main-200 font-700 text-center desktop:text-[22px] font-space_grotesk">
            {"You don't have favorite domain"}
          </p>
        )}
        {favoriteItems.length !== 0 &&
          favoriteItems.map((item: string, index: number) => (
            <FollowerItem name={item} index={index + 1} key={`follower-item-${index}`} />
          ))}
      </div>
    </div>
  );
};

export default FavoriteView;
