import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Flex, GradientText, Image } from "@/components";
import { QRCode } from "react-qrcode-logo";
import toast, { Toaster } from "react-hot-toast";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
// assets
import { monthNames } from "@/utils/constants";
import { MdOutlineEmail as Email } from "react-icons/md";
import { FaInstagram as Instagram } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { TfiTwitter as Twitter } from "react-icons/tfi";
import { LiaDiscord as Discord, LiaTelegram as Telegram } from "react-icons/lia";

import { CiLinkedin as Linkedin } from "react-icons/ci";
import { useAccount } from "wagmi";
// icons
import { BsCopy } from "react-icons/bs";
import { LuLink } from "react-icons/lu";
import { GoThumbsdown, GoThumbsup } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { MdOutlineAccessTime, MdOutlineLocationOn, MdOutlineWidgets, MdOutlineEdit } from "react-icons/md";
import clsx from "clsx";
import { fetchTokenUri } from "@/utils/web3/core/fetchTokenUri";
import { useTokenUriLookup } from "@/utils/web3/hooks/useTokenUriLookup";
import { useGetPrimaryDomain } from "@/utils/web3/hooks/useGetPrimaryDomain";
import { useGetChainName } from "@/utils/web3/hooks/useGetChainName";
// import DomainRegisterPage from '../../../pages/search';

const HeroView: React.FC<{ domainName?: string; editmode?: boolean; owner?: boolean; domain: any; user: any }> = ({
  domainName = "",
  editmode = false,
  domain,
  user,
  owner = false
}) => {
  const router = useRouter();
  const [bannerImg, setBannerImg] = useState<string>("/img/profile/banner.png");
  const [avatarImg] = useState<string>("/img/home/badges/con2.png");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [svgString, setSvgString] = useState<string | null>(null);
  const chainName = useGetChainName();
  const { address, isConnected } = useAccount();
  console.log(address, "address");
  // const [isFollow, setFollow] = useState<boolean>(false);

  domain = domain.domain;
  user = user.user;

  const primaryDomain = useGetPrimaryDomain();

  const [domainData, setDomainData] = useState({
    bannerURL: domain?.bannerURL || "",
    bio: domain?.bio || "",
    category: domain?.category || "",
    dateJoined: domain?.dateJoined || "",
    discord: domain?.discord || "",
    discordVerified: domain?.discordVerified || false,
    domainName: domain?.domainName || "",
    id: domain?.id || "",
    instagram: domain?.instagram || "",
    instagramVerified: domain?.instagramVerified || false,
    linkedin: domain?.linkedin || "",
    linkedinVerified: domain?.linkedinVerified || false,
    location: domain?.location || "",
    mainImgUrl: domain?.mainImgUrl || "",
    name: domain?.name || "",
    telegram: domain?.telegram || "",
    telegramVerified: domain?.telegramVerified || false,
    twitter: domain?.twitter || "",
    twitterVerified: domain?.twitterVerified || false,
    userId: domain?.userId || "",
    website: domain?.website || "",
    websiteVerified: domain?.websiteVerified || false,
    youtube: domain?.youtube || "",
    youtubeVerified: domain?.youtubeVerified || false,
    followerCount: domain?.followerIds.length || 0,
    followingCount: domain?.followingIds.length || 0
  });

  const [showDomainUriAsAvatar, setShowDomainUriAsAvatar] = useState<boolean>(!domainData?.mainImgUrl);

  // Define the USER_SOCIAL_LINKS array
  const USER_SOCIAL_LINKS = [
    { id: 1, icon: Instagram, link: domainData.instagram, isVerify: domainData.instagramVerified, label: "Instagram" },
    { id: 2, icon: Twitter, link: domainData.twitter, isVerify: domainData.twitterVerified, label: "Twitter" },
    { id: 3, icon: Discord, link: domainData.discord, isVerify: domainData.discordVerified, label: "Discord" },
    { id: 4, icon: Linkedin, link: domainData.linkedin, isVerify: domainData.linkedinVerified, label: "Linkedin" },
    { id: 5, icon: Telegram, link: domainData.telegram, isVerify: domainData.telegramVerified, label: "Telegram" },
    { id: 6, icon: Email, link: `mailto:${user?.email}`, isVerify: user?.verified, label: "Email" }, // Assuming email doesn't come from domainData
    { id: 7, icon: AiOutlineGlobal, link: domainData.website, isVerify: domainData.websiteVerified, label: "Website" }
  ];

  const formattedDate = new Date(domain?.dateJoined);
  const month = monthNames[formattedDate.getMonth()];
  const year = formattedDate.getFullYear();
  const formattedDateString = `${month}, ${year}`;

  const follow = async () => {
    if (isFollow == false) {
      const domainRequestBody = {
        followingId: domainData.id,
        followingDomain: primaryDomain,
        followerChain: chainName,
        followerWalletAddress: address
      };
      try {
        toast("Following");
        const response = await fetch("/api/domain/followers/add/addFollower", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(domainRequestBody)
        });

        if (response.ok) {
          toast.success("Followed");
          setFollow(true);
        } else {
          throw new Error("Failed to fetch follower details");
        }
      } catch (error) {
        console.error("Error fetching follower details:", error);
        return null; // Handle error gracefully
      }
    } else {
      const domainRequestBody = {
        followingId: domainData.id,
        followingDomain: primaryDomain,
        followerChain: chainName,
        followerWalletAddress: address
      };
      try {
        toast("Following");
        const response = await fetch("/api/domain/followers/delete/deleteFollower", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(domainRequestBody)
        });

        if (response.ok) {
          toast.success("Followed");
          setFollow(true);
        } else {
          throw new Error("Failed to fetch follower details");
        }
      } catch (error) {
        console.error("Error fetching follower details:", error);
        return null; // Handle error gracefully
      }
    }
  };

  const unFollow = async () => {
    const domainRequestBody = {
      followingId: domainData.id,
      followingDomain: primaryDomain,
      followerChain: chainName,
      followerWalletAddress: address
    };
    try {
      toast("Following");
      const response = await fetch("/api/domain/followers/delete/deleteFollower", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(domainRequestBody)
      });

      if (response.ok) {
        toast.success("Unfollowed");
        setFollow(false);
      } else {
        throw new Error("Failed to fetch follower details");
      }
    } catch (error) {
      console.error("Error fetching follower details:", error);
      return null; // Handle error gracefully
    }
    setFollow(false);
  };

  const [isFollow, setFollow] = useState<boolean>(false);
  const onClickSetting = (mode: string) => {
    router.query.editmode = mode;
    router.push(router);
  };

  const copyToClipboard = (text: string, label: string) => {
    if (!navigator.clipboard) {
      console.error("Clipboard API not supported");
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success(label);
      },
      (err) => {
        console.error("Failed to copy:", err);
      }
    );
  };

  const onSelectBannerImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Start uploading");

    if (e.target.files && e.target.files.length > 0) {
      const toastId = toast.loading("Uploading Image", { duration: 10000 });
      console.log("Start uploading");
      // setBannerImg(URL.createObjectURL(e.target.files[0]));
      const file = e.target.files[0];
      console.log(file);
      try {
        const newBlob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload/banner?id=" + domainData.id
        });

        // console.log(newBlob, "newBlob");
        toast.dismiss(toastId);
        toast.success("Image Uploaded");
        setShowModal(false);
        setDomainData({ ...domainData, bannerURL: newBlob.url });
      } catch (e) {
        console.log(e);
        // console.log(newBlob);
      }
    }
  };

  const onSelectMainImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Start uploading");

    if (e.target.files && e.target.files.length > 0) {
      const toastId = toast.loading("Uploading Image", { duration: 10000 });
      console.log("Start uploading");
      // setBannerImg(URL.createObjectURL(e.target.files[0]));
      const file = e.target.files[0];
      console.log(file);
      try {
        const newBlob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload/avatar?id=" + domainData.id
        });
        toast.dismiss(toastId);
        // console.log(newBlob, "newBlob");
        toast.success("Image Uploaded");
        setShowModal(false);
        setShowDomainUriAsAvatar(false);
        setDomainData({ ...domainData, mainImgUrl: newBlob.url });
      } catch (e) {
        console.log(e);
        // console.log(newBlob);
      }
    }
  };

  const { domainUri } = useTokenUriLookup(domainData.domainName.split(".")[0]);

  // useEffect(() => {
  //   const decodeImageData = (dataUri: string) => {
  //     if (!dataUri) {
  //       console.error("Invalid dataUri:", dataUri);
  //       return null;
  //     }
  //     const base64Json = dataUri.split(",")[1];
  //     const jsonString = atob(base64Json);
  //     const jsonData = JSON.parse(jsonString);
  //     const imageWithPrefix = jsonData?.image;
  //     if (!imageWithPrefix) {
  //       console.error("Invalid image property:", imageWithPrefix);
  //       return null;
  //     }
  //     const base64Image = imageWithPrefix.split(",")[1];
  //     const decodedImage = atob(base64Image);
  //     return decodedImage;
  //   };
  //   const svgSrc = decodeImageData(domainUri as string);
  //   setSvgString(svgSrc);
  // }, [domainUri]);

  useEffect(() => {
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

    if (isConnected) {
      const svgSrc = decodeImageData(domainUri as string);
      setSvgString(svgSrc);
    } else {
      const fetchAndDecodeUri = async () => {
        try {
          const domainUri = await fetchTokenUri(domainData.domainName.split(".")[0]);
          const svgSrc = decodeImageData(domainUri);
          setSvgString(svgSrc);
        } catch (error) {
          console.error("Error fetching or decoding domainUri:", error);
        }
      };
      fetchAndDecodeUri();
    }
  }, [domainData, domainUri, isConnected]);

  // useEffect(() => {
  const handleUpdateProfile = async (id: number) => {
    try {
      const toastId = toast.loading("Setting NFT as avatar", { duration: 10000 });
      const response = await fetch("/api/domain/update/updateDomain", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id,
          mainImgUrl: "",
          chain: chainName
        })
      });

      if (response.ok) {
        toast.dismiss(toastId);
        toast.success("Image Uploaded");
        // Handle success
        console.log(response.json());
        console.log("Profile updated successfully");
        setShowDomainUriAsAvatar(true);
        setShowModal(false);
      } else {
        // Handle error
        console.error("Error updating profile:", response.statusText);
        // setShowDomainUriAsAvatar(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  //   if (showDomainUriAsAvatar) {
  //     const handleProfileImg = async () => {
  //       await handleUpdateProfile(domainData.id);
  //     };
  //     handleProfileImg();
  //   }
  // }, [showDomainUriAsAvatar]);

  const SVGMain = ({ svgString }: { svgString: SVGRectElement }) => (
    <svg
      viewBox="-1 0 160 160"
      className="w-[185px] h-[185px] object-cover rounded-full tablet:w-[130px] tablet:h-[130px]"
      dangerouslySetInnerHTML={{
        __html: svgString as unknown as string
      }}
    />
  );

  const SVGChoice = ({ svgString }: { svgString: SVGRectElement }) => (
    <svg
      viewBox="-1 0 160 160"
      className="w-[132px] h-[132px] rounded-full cursor-pointer small:w-[110px] small:h-[110px] object-top "
      dangerouslySetInnerHTML={{
        __html: svgString as unknown as string
      }}
    />
  );
  // console.log(domainData);
  async function twitterRedirect() {
    let description =
      "Exciting news for our @znsconnect community! 🟢\n" +
      "\n" +
      "Join me by following back! 🚀✨\n" +
      "\n" +
      "Visit:";

    let url = window.location.href.split("?")[0];
    let hashtags = "zns,znsconnect,nameservise";
    window.open(`https://twitter.com/intent/tweet?text=${description}&url=${url}&hashtags=${hashtags}`, "_blank");
  }

  const checkFollowing = async () => {
    try {
      const domainRequestBody = {
        domainName: primaryDomain,
        walletAddress: address,
        chain: chainName
      };

      const response = await fetch("/api/domain/fetch/fetchDomain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(domainRequestBody)
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Fetched domain data:", data);
        // Handle your fetched domain data here
        if (data.data.domain.followingIds.includes(domain.id)) {
          setFollow(true);
        } else {
          setFollow(false);
        }
      } else {
        console.error("Failed to fetch domain:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching domain:", error);
    }
  };
  useEffect(() => {
    checkFollowing();
  }, [primaryDomain, address, chainName]);

  return (
    <>
      <Flex
        direction="flex-col"
        justifyContent="justify-center"
        align="items-center"
        className="space-y-[30px] pb-[60px]"
      >
        <div className="relative w-full max-w-[calc(1440px-128px)] h-[360px] tablet:h-[200px] mt-[99px]">
          <Image
            src={domainData?.bannerURL || bannerImg}
            width={1500}
            height={500}
            className="w-full h-full object-cover"
            alt="profile banner"
          />
          <Flex align="items-center" justifyContent="justify-center">
            <div className="absolute group -bottom-1/4 tablet:-bottom-[70px] w-[200px] h-[200px] tablet:w-[140px] tablet:h-[140px] rounded-full bg-main-200 flex justify-center items-center">
              <div className="relative">
                {showDomainUriAsAvatar ? (
                  <SVGMain svgString={svgString as unknown as SVGRectElement} />
                ) : (
                  <Image
                    src={domainData?.mainImgUrl}
                    width={185}
                    height={185}
                    className="object-cover rounded-full tablet:w-[130px] tablet:h-[130px]"
                    alt="profile avatar"
                  />
                )}

                {user?.verified && (
                  <Image
                    src={"/img/verify.png"}
                    width={34}
                    height={34}
                    className="absolute top-2 right-1 w-10 h-10 tablet:w-8 tablet:h-8 tablet:right-0"
                    alt="profile_verify_avatar"
                  />
                )}
              </div>
              {editmode && owner && (
                <label
                  onClick={() => setShowModal(true)}
                  className="absolute cursor-pointer bg-black/40 w-full h-full rounded-full justify-center items-center inline-flex opacity-0 group-hover:opacity-100 duration-200 "
                >
                  <MdOutlineEdit className="text-main-400 w-7 h-7" />
                </label>
              )}
            </div>
          </Flex>
          <Flex className="absolute space-x-[10px] right-4 top-4">
            {editmode && owner && (
              <>
                <label className="p-2 bg-black/40 rounded-xl text-main-400 cursor-pointer" htmlFor="banner-file">
                  <MdOutlineEdit className="w-5 h-5" />
                </label>
                <input onChange={onSelectBannerImg} className="hidden" id="banner-file" type="file" />
              </>
            )}
            <label
              onClick={() =>
                copyToClipboard(`${window.location.origin}${window.location.pathname}`, "Share Link Copied")
              }
              className="p-2 bg-black/40 rounded-xl text-main-400 cursor-pointer"
            >
              <LuLink className="w-5 h-5" />
            </label>
            <label
              onClick={() => twitterRedirect()}
              className="p-2 bg-black/40 rounded-xl text-main-400 cursor-pointer"
            >
              <FaXTwitter className="w-5 h-5" />
            </label>
          </Flex>
        </div>
        <Container>
          <Flex direction="flex-col" align="items-center" justifyContent="justify-center" className="tablet:pt-[50px]">
            <Flex
              justifyContent="justify-between"
              className="w-9/12 desktop:w-11/12 laptop:w-full tablet:flex-col tablet:items-center tablet:space-y-2"
            >
              <Flex
                align="items-center"
                justifyContent="justify-between"
                className="w-1/3 tablet:w-10/12 mobile:w-full  tablet:items-start"
              >
                <Flex direction="flex-col" className="space-y-1 tablet:w-[120px]" align="items-center">
                  <p className="text-[18px] laptop:text-[16px] font-600">{domainData.followerCount}</p>
                  <p className="text-[12px] laptop:text-[10px] font-400 text-main-400 text-center">FOLLOWERS</p>
                </Flex>
                <Flex direction="flex-col" className="space-y-1 tablet:w-[120px]" align="items-center">
                  <p className="text-[18px] laptop:text-[16px] font-600">{domainData.followingCount}</p>
                  <p className="text-[12px] laptop:text-[10px] font-400 text-main-400 text-center">FOLLOWING</p>
                </Flex>
                <Flex direction="flex-col" className="space-y-1 tablet:w-[120px]" align="items-center">
                  <p className="text-[18px] laptop:text-[16px] font-600">{domainData?.id}</p>

                  <p className="text-[12px] laptop:text-[10px] font-400 text-main-400 text-center">ZNS ID</p>
                </Flex>
              </Flex>
              <div className="w-1/3 tablet:w-10/12  mobile:w-full tablet:border-main-300 tablet:border"></div>
              <Flex
                align="items-center"
                justifyContent="justify-between"
                className="w-1/3 tablet:w-10/12  mobile:w-full  tablet:items-start"
              >
                <Flex direction="flex-col" className="space-y-1  tablet:w-[120px]" align="items-center">
                  <MdOutlineAccessTime className="w-[18px] h-[18px]" />

                  <p className="text-[12px] laptop:text-[10px] font-400 text-main-400 text-center">
                    {formattedDateString}
                  </p>
                </Flex>
                <Flex direction="flex-col" className="space-y-1  tablet:w-[120px]" align="items-center">
                  <MdOutlineLocationOn className="w-[18px] h-[18px]" />
                  <p className="text-[12px] laptop:text-[10px] font-400 text-main-400 text-center">
                    {domainData?.location || "No location added"}
                  </p>
                </Flex>
                <Flex direction="flex-col" className="space-y-1  tablet:w-[120px]" align="items-center">
                  <MdOutlineWidgets className="w-[18px] h-[18px]" />
                  <p className="text-[12px] laptop:text-[10px] font-400 text-main-400 text-center">
                    {domainData?.category}
                  </p>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction="flex-col" align="items-center" className="space-y-3 max-w-[400px] pt-5">
              <div className="text-[40px] font-500 tablet:text-[34px]">
                <GradientText>{domainData?.name}</GradientText>
              </div>
              <p className="text-[22px] font-400 tablet:text-[20px]">{domainData?.domainName}</p>
              <p className="font-space_grotesk text-[12px] tablet:text-[10px] font-400 text-center">
                {domainData?.bio || "Add your bio here"}
              </p>
              <Flex align="items-center" className="space-x-5 mobile:space-x-3">
                {USER_SOCIAL_LINKS.map((item, index) => (
                  <a href={item.link} target="_blank" rel="noreferrer" key={`user-profile-link-${index}`}>
                    <div className="relative" key={`user-profile-link-${index}`}>
                      <item.icon
                        className={`w-10 h-10 tablet:w-8 tablet:h-8 cursor-pointer hover:text-verified/70 ${item.isVerify && "text-verified"}`}
                      />
                      {item.isVerify && (
                        <Image
                          src={"/img/verify_blue.png"}
                          width={20}
                          height={20}
                          className="absolute w-6 h-6 -bottom-1 right-0  tablet:w-5 tablet:h-5"
                          alt="profile_verify_avatar"
                        />
                      )}
                    </div>
                  </a>
                ))}
              </Flex>

              <Flex
                align="items-center"
                justifyContent="justify-between"
                className="p-5 space-x-4 w-full small:flex-col small:space-x-0 small:space-y-4 relative"
              >
                {!owner ? (
                  <>
                    {!isFollow ? (
                      <button
                        onClick={() => follow()}
                        className="bg-primary text-black rounded-3xl w-full inline-flex items-center justify-center p-3"
                      >
                        <Flex align="items-center" className="space-x-[10px]">
                          <GoThumbsup className="w-5 h-5" />
                          <span className="text-[12px]">Follow</span>
                        </Flex>
                      </button>
                    ) : (
                      <button
                        onClick={() => unFollow()}
                        className="border border-primary text-primary rounded-3xl w-full inline-flex items-center justify-center p-3"
                      >
                        <Flex align="items-center" className="space-x-[10px]">
                          <GoThumbsdown className="w-5 h-5" />
                          <span className="text-[12px]">UnFollow</span>
                        </Flex>
                      </button>
                    )}
                    <button
                      onClick={() => copyToClipboard(user?.wallet, "Address Copied")}
                      className="bg-primary text-black rounded-3xl w-full inline-flex items-center justify-center p-3"
                    >
                      <Flex align="items-center" className="space-x-[10px]">
                        <BsCopy className="w-5 h-5" />
                        <span className="text-[12px]">{user?.wallet}</span>
                      </Flex>
                    </button>
                  </>
                ) : editmode ? (
                  <button
                    onClick={() => onClickSetting("false")}
                    className="bg-primary text-black rounded-3xl w-full inline-flex items-center justify-center p-3"
                  >
                    <Flex align="items-center" className="space-x-[10px]">
                      <RxUpdate className="w-5 h-5" />
                      <span className="text-[12px]">Update</span>
                    </Flex>
                  </button>
                ) : (
                  <button
                    onClick={() => onClickSetting("true")}
                    className="bg-primary text-black rounded-3xl w-full inline-flex items-center justify-center p-3"
                  >
                    <Flex align="items-center" className="space-x-[10px]">
                      <MdOutlineEdit className="w-5 h-5" />
                      <span className="text-[12px]">Change Avatar and Banner</span>
                    </Flex>
                  </button>
                )}
                <div className="absolute -right-[100px]  tablet:right-[155px] tablet:top-[100px] small:hidden">
                  <QRCode
                    size={80}
                    bgColor="transparent"
                    fgColor="white"
                    value={window.location.href.split("?")[0]}
                    logoImage={"/img/zns-logo.png"}
                    logoWidth={30}
                    logoHeight={30}
                  />
                </div>
                <div className={clsx("absolute small:block hidden", owner ? "small:top-[70px]" : "small:top-[150px]")}>
                  <QRCode
                    size={80}
                    bgColor="transparent"
                    fgColor="white"
                    value={window.location.href.split("?")[0]}
                    logoImage={"/img/zns-logo.png"}
                    logoWidth={30}
                    logoHeight={30}
                  />
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Flex>
      <div
        className={`fixed h-full w-full transition-all duration-300 z-[500] left-0 top-0 bg-black/60 flex justify-center items-center ${showModal ? "visible opacity-100 backdrop-blur-2xl" : "invisible opacity-0"}`}
      >
        <div className="absolute bg-main-100 p-8 rounded-xl small:p-3">
          <IoMdCloseCircle
            className="absolute w-[30px] h-[30px] -right-7 -top-7 final:hidden cursor-pointer"
            onClick={() => setShowModal(false)}
          />

          <Flex direction="flex-col" justifyContent="justify-between" className="space-y-10">
            <div className="text-[24px] font-500">
              <GradientText>Update your Avatar</GradientText>
            </div>
            <Flex align="items-start" justifyContent="justify-between" className="space-x-[37px] small:space-x-5">
              <Flex direction="flex-col" align="items-center" className="space-y-4">
                <label className="relative items-center justify-center flex cursor-pointer" htmlFor="avatar-file">
                  <div className="w-[132px] h-[132px] rounded-full border border-main-300 small:w-[110px] small:h-[110px]"></div>
                  <FaPlus className="absolute w-[24px] h-[24px] text-verified/45" />
                </label>
                <p className="text-[12px] font-700 font-space_grotesk">Upload from your pc</p>
                <input className="hidden" id="avatar-file" type="file" onChange={onSelectMainImg} />
              </Flex>
              <Flex direction="flex-col" align="items-center" className="space-y-4">
                <label onClick={() => handleUpdateProfile(domainData.id)}>
                  {/* <Image
                    src={"/img/domain_preview.png"}
                    width={132}
                    height={132}
                    alt="domain_preview"
                    className="rounded-full cursor-pointer small:w-[110px] small:h-[110px]"
                  /> */}
                  <SVGChoice svgString={svgString as unknown as SVGRectElement} />
                </label>
                <p className="text-[12px] font-700 font-space_grotesk">Use your Domain Name</p>
              </Flex>
            </Flex>
            <Flex
              align="items-center"
              justifyContent="justify-end"
              className="space-x-3 small:flex-col small:space-x-0 small:space-y-3 small:items-stretch"
            >
              <button
                onClick={() => setShowModal(false)}
                className="text-[12px] font-300 text-main-400 bg-main-300 p-4 px-8 rounded-3xl"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="text-[12px] font-300 text-main-100 bg-primary py-4 px-8 rounded-3xl"
              >
                Confirm
              </button>
            </Flex>
          </Flex>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default HeroView;
