import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Flex, Image } from "..";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { useContextLocalStorage } from "@/contexts";
import { useContextFavorite } from "@/contexts/FavoriteProvider";
import { useDomainDetails } from "@/utils/web3/hooks/useDomainDetails";
import toast, { Toaster } from "react-hot-toast";
import { useAccount } from "wagmi";
import { fetchDomainDetails } from "@/utils/web3/core/fetchDomainDetails";
import { fetchTokenUri } from "@/utils/web3/core/fetchTokenUri";
import { useTokenUriLookup } from "@/utils/web3/hooks/useTokenUriLookup";
import { usePriceToRegister } from "@/utils/web3/hooks/usePriceToRegister";
import { useGetDomainTLD } from "@/utils/web3/hooks/useGetDomainTLD";
import { fetchPriceToRegister } from "@/utils/web3/core/fetchPriceToRegister";
import { formatPrice } from "@/utils/func";

export const FollowerItem = ({
  src = "/img/profile/1.png",
  name,
  count = 214
  // price
}: {
  src?: string;
  name: string;
  index: number;
  // price?: string;
  count?: number;
}) => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { domainUri } = useTokenUriLookup(name);
  const [domainStatus, setDomainStatus] = useState<boolean>(false);
  const [svgString, setSvgString] = useState<string | null>(null);
  const [priceToDisplay, setPriceToDisplay] = useState<string>("N/A");
  const [symbolToDisplay, setSymbolToDisplay] = useState<string>("");
  const { priceInEther, symbol } = usePriceToRegister(name.length);
  const { favorite, setFavorite } = useContextFavorite();
  const [isfollow, setIsFollow] = useState<boolean>(false);
  const { localstorage, setLocalStorage } = useContextLocalStorage();
  const { domainData } = useDomainDetails(name || "");
  const TLD = useGetDomainTLD();

  useEffect(() => {
    let favoriteItems = JSON.parse(favorite);
    const isInclude = favoriteItems.includes(name);
    setIsFollow(isInclude);
  }, [favorite, name]);

  useEffect(() => {
    //URI Decode
    const decodeImageData = (dataUri: string) => {
      if (!dataUri) {
        return null;
      }
      try {
        const base64Json = dataUri.split(",")[1];
        const jsonString = atob(base64Json);
        const jsonData = JSON.parse(jsonString);
        const imageWithPrefix = jsonData?.image;
        if (!imageWithPrefix) {
          console.error("Invalid image property:", imageWithPrefix);
          return null;
        }
        const base64Image = imageWithPrefix.split(",")[1];
        const decodedImage = atob(base64Image);
        return decodedImage;
      } catch (error) {
        console.error("Invalid image data:", error);
        return null;
      }
    };

    const checkDomainStatus = (_domainData: any) => {
      if ((_domainData as { domainName: string })?.domainName === "") {
        setDomainStatus(true);
      } else {
        setDomainStatus(false);
      }
    };

    //Condition for Wallet Connected or not
    if (isConnected) {
      checkDomainStatus(domainData);
      if (!domainStatus) {
        const svgSrc = decodeImageData(domainUri as string);
        setSvgString(svgSrc);
      }
    } else {
      const fetchDomainInfo = async () => {
        try {
          const NWC_domainData = await fetchDomainDetails(name);
          checkDomainStatus(NWC_domainData);
          if (!domainStatus) {
            const domainUri = await fetchTokenUri(name);
            const svgSrc = decodeImageData(domainUri as string);
            setSvgString(svgSrc);
          }
        } catch (error) {
          console.error("Error fetching:", error);
        }
      };
      fetchDomainInfo();
    }
  }, [name, domainStatus, domainUri, domainData, isConnected]);

  //Price Set
  useEffect(() => {
    if (isConnected) {
      setPriceToDisplay(priceInEther as string);
      setSymbolToDisplay(symbol as string);
    } else {
      const fetchRegistrationDetails = async () => {
        const { NWC_priceInEther, symbol } = await fetchPriceToRegister(name.length);
        setPriceToDisplay(NWC_priceInEther);
        setSymbolToDisplay(symbol);
      };
      if (name.length > 0) fetchRegistrationDetails();
    }
  }, [isConnected, priceInEther, name, symbol]);

  const SVGChoice = ({ svgString }: { svgString: SVGRectElement }) => (
    <svg
      viewBox="-1 0 160 160"
      className="w-[62px] h-[62px] shrink-0 rounded-full desktop:w-[100px] desktop:h-[100px] object-top "
      dangerouslySetInnerHTML={{
        __html: svgString as unknown as string
      }}
    />
  );

  const onCheckFromStroage = () => {
    let saveItems = JSON.parse(localstorage);
    const itemsWithName = saveItems.filter((item: any) => item.name === name);
    if (itemsWithName.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const onAddToCart = () => {
    if (domainStatus) {
      toast.success("Added to cart");
      let saveItems = JSON.parse(localstorage);
      let newItem = { name: name, year: 1 };
      saveItems.push(newItem);
      setLocalStorage(JSON.stringify(saveItems));
      localStorage.setItem("domains", JSON.stringify(saveItems));
    } else {
      router.push({
        pathname: `/profile/${name}.${TLD}`,
        query: { domain: name, editmode: false, owner: false }
      });
    }
  };

  const onDeleteCart = (name: string) => {
    toast.success("Removed from cart");
    let savedItems = JSON.parse(localstorage);
    let filterItem = savedItems.filter((item: any) => item.name !== name);
    setLocalStorage(JSON.stringify(filterItem));
    localStorage.setItem("domains", JSON.stringify(filterItem));
  };

  const onHandleFavorite = () => {
    let favoriteItems = JSON.parse(favorite);
    let newArray;
    if (isfollow) {
      toast.success("Removed from Favorites");
      newArray = favoriteItems.filter((item: string) => item !== name);
    } else {
      toast.success("Added to Favorites");
      newArray = [...favoriteItems, name];
    }
    localStorage.setItem("favorite", JSON.stringify(newArray));
    setFavorite(JSON.stringify(newArray));
  };

  return (
    <div className="relative px-5 py-3 rounded-2xl bg-black/40 hover:bg-main-100 border border-main-300">
      <Flex
        align="items-center"
        justifyContent="justify-between"
        className={clsx(
          "h-full space-x-4 pr-[30px]",
          "desktop:flex-col desktop:space-y-2 desktop:space-x-0 desktop:pr-0 desktop:py-2"
        )}
      >
        <Flex
          align="items-center"
          className="h-full space-x-4 w-full desktop:flex-col desktop:space-y-2 desktop:space-x-0 desktop:justify-start"
        >
          {domainStatus ? (
            <Image
              src={src}
              alt={name}
              fill
              className={clsx("w-[62px] h-[62px] shrink-0 rounded-full", "desktop:w-[100px] desktop:h-[100px]")}
            />
          ) : (
            <SVGChoice svgString={svgString as unknown as SVGRectElement} />
          )}

          <div className="desktop:text-center desktop:h-full">
            <p className="text-[20px] font-500 break-all">{`${name}.${TLD}`}</p>
            <p className={clsx("text-success text-[16px] font-700", "mobile:text-[14px]")}>{count}</p>
          </div>
        </Flex>
        <Flex
          align="items-center"
          justifyContent="justify-end"
          className={clsx("space-x-5", "desktop:flex-col desktop:space-x-0 desktop:space-y-2")}
        >
          <p className="w-[150px] text-primary text-[16px] font-500 desktop:text-center">
            {`${formatPrice(Number(priceToDisplay))} ${symbolToDisplay}`}
          </p>
          {onCheckFromStroage() ? (
            <>
              <button
                onClick={() => onDeleteCart(name)}
                className={clsx(
                  "inline-flex justify-center items-center w-[132px] h-[35px] rounded-md p-1",
                  "small:hidden bg-success"
                )}
              >
                <span className="small:hidden">{"Added"}</span>
              </button>
              <button
                onClick={() => onDeleteCart(name)}
                className={clsx("hidden small:block small:w-4 small:h-4 small:rounded-full bg-success")}
              ></button>
            </>
          ) : (
            <>
              <button
                onClick={onAddToCart}
                className={clsx(
                  "inline-flex justify-center items-center w-[132px] h-[35px] rounded-md p-1",
                  !domainStatus ? "bg-error" : "bg-verified"
                )}
              >
                <span>{!domainStatus ? "Profile" : "Add to cart"}</span>
              </button>
            </>
          )}
          <button onClick={onHandleFavorite} className="absolute right-3 desktop:top-3">
            {isfollow ? (
              <MdOutlineFavorite className="w-5 h-5 text-favorite" />
            ) : (
              <MdFavoriteBorder className="w-5 h-5 text-favorite" />
            )}
          </button>
        </Flex>
      </Flex>
      <Toaster />
    </div>
  );
};
