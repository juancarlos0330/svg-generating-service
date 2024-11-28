import type { NextPage } from "next";

import { Container } from "@/components";
import CartView from "@/views/cart";
import { Page } from "@/components/Page";

const CartPage: NextPage = () => {
  return (
    <Page name="cart">
      <Container>
        <CartView />
      </Container>
    </Page>
  );
};

export default CartPage;
