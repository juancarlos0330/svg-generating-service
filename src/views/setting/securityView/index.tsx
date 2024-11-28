import React, { useState, useRef, useEffect } from "react";
import { useAccount } from "wagmi";
import { Flex, GradientText, Image } from "@/components";
import { useGetChainName } from "@/utils/web3/hooks/useGetChainName";
import toast from "react-hot-toast";

const SecurityView: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const otpInputRef = useRef<HTMLInputElement>(null);
  const { address } = useAccount();
  const [id, setId] = useState<string>("");
  const [userVerified, setUserVerified] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();
  const [buttonVerifi, setbuttonVerifi] = useState<string>("Verify Email");
  const chain = useGetChainName();

  const chainName = useGetChainName();

  const handleUpdate = async () => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the entered email is valid
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return; // Exit the function if the email is invalid
    } else {
      toast.success("Sending Email");
    }

    try {
      const response = await fetch("/api/verify/verify_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, reason: "send_otp", wallet: address })
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      const data = await response.json();
      console.log("OTP sent successfully:", data);
      setId(data.id); // Handle success response here
      setShowOtpInput(true); // Show OTP input field after successful API call
    } catch (error) {
      console.error("Error sending OTP:", error);
      // Handle error here
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch("/api/verify/verify_otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, reason: "verify_otp", wallet: address, id: id, chain, otp: otp })
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      } else {
        const data = await response.json();
        if (data !== "Wrong_otp") {
          console.log("OTP verified:", data);
          // Handle success response here
          setShowOtpInput(true); // Show OTP input field after successful API call
          setbuttonVerifi("Verified");
          setTimeout(() => {
            // setbuttonVerifi("Verify Email");
          }, 3000);
          toast.success("Email Verified");
          setShowOtpInput(false);
        } else {
          toast.error("Wrong OTP");
        }
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      // Handle error here
      setShowOtpInput(false);
    }
  };

  const getUserDetails = async (walletAddress: string, chainName: string | undefined) => {
    if (walletAddress != "" && chainName != "") {
      try {
        const userRequestBody = {
          walletAddress,
          chainName
        };

        const response = await fetch("/api/user/fetch/fetchUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userRequestBody)
        });

        if (response.ok) {
          const data = await response.json();

          return data.data;
        } else {
          console.error("Failed to fetch user:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Error fetching user");
      }
    }
  };

  useEffect(() => {
    if (address) {
      getUserDetails(address, chainName).then((data) => {
        if (data) {
          // console.log(data, "data");
          if (data.user.verified) {
            setUserVerified(true);
            setUserData(data.user);
          }
        }
      });
    }
  });

  return (
    <div className="w-full">
      <div className="uppercase text-[36px] font-500 font-space_grotesk border-b-2 border-primary/30 pb-3">
        <GradientText>security</GradientText>
      </div>
      <Flex direction="flex-col" className="pt-5 space-y-3 w-[578px] laptop:w-full">
        <Flex direction="flex-col" className="w-full space-y-[10px]">
          <p className="text-[16px] font-500 text-main-900 ">Your Email</p>
          <Flex align="items-center" className="relative space-x-5">
            <input
              ref={emailInputRef}
              placeholder={userData?.email || "Enter your Email"}
              className="placeholder:text-[14px] w-full h-[54px] rounded-xl px-4 placeholder:text-white-500 border border-main-300 outline-none bg-black/40"
              onChange={(e) => setEmail(e.target.value)}
            />
            {userVerified ? (
              <Image
                src={"/img/verify_blue.png"}
                width={20}
                height={20}
                className="absolute w-6 h-6 right-5 tablet:w-5 tablet:h-5"
                alt="profile_verify_avatar"
              />
            ) : null}
          </Flex>
        </Flex>

        {showOtpInput && (
          <Flex direction="flex-col" className="w-full space-y-[10px]">
            <p className="text-[16px] font-500 text-main-900 ">OTP</p>
            <input
              ref={otpInputRef}
              placeholder="Enter OTP"
              className="placeholder:text-[14px] w-full h-[54px] rounded-xl px-4 placeholder:text-white-500 border border-main-300 outline-none bg-black/40"
              onChange={(e) => setOtp(e.target.value)}
            />
          </Flex>
        )}

        <div className="pt-5  w-[200px] tablet:w-full">
          {!showOtpInput ? (
            <button
              onClick={handleUpdate}
              className="w-full bg-primary text-[16px] font-500 px-[38px] py-[11px] rounded-3xl text-black "
            >
              Send Code
            </button>
          ) : (
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-primary text-[16px] font-500 px-[38px] py-[11px] rounded-3xl text-black "
            >
              {buttonVerifi}
            </button>
          )}
        </div>
      </Flex>
    </div>
  );
};

export default SecurityView;
