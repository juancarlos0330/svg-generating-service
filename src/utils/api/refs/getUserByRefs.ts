import toast from "react-hot-toast";

export  const getUserDetails = async (referralCode: string) => {
  if (referralCode != "") {
    try {
      const userRequestBody = {
        referralCode,
      };

      const response = await fetch("/api/user/fetch/fetchUserByRef", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userRequestBody)
      });

      if (response.ok) {
        const data = await response.json();
        return data.data.user.walletAddress;
      } else {
        console.error("Failed to fetch user:", response.statusText);
        return "WRONG_CHAIN";
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Error fetching user");
      return "WRONG_CHAIN";
    }
  }
};