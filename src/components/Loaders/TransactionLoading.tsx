import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const TransactionLoading = ({ size, color }: { size: number; color: string }) => {
  return <PuffLoader size={size} color={color} />;
};

export default TransactionLoading;
