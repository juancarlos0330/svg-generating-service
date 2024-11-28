import { fetchPriceToRegister } from "./fetchPriceToRegister";
import { fetchPriceToRenew } from "./fetchPriceToRenew";

export const getTotalCartPrice = async (cartItems: string[]) => {
  const NWC_cartItemsPrice = [];
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const { NWC_priceInEther } = await fetchPriceToRegister(item.length);
    const { NWC_renewPriceInEther } = await fetchPriceToRenew(item.length);
    NWC_cartItemsPrice.push({
      name: item,
      priceToRegister: NWC_priceInEther,
      priceToRenew: NWC_renewPriceInEther
    });
  }

  return NWC_cartItemsPrice;
};
