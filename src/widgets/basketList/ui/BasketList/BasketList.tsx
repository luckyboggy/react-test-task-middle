import React, { FC, useContext } from "react";
import { Context } from "index";
import BasketItem from "../BasketItem/BasketItem";
import { TBasketProduct } from "shared/types/types";
import { observer } from "mobx-react-lite";
import cls from "./BasketList.module.scss";

const BasketList: FC = observer(() => {
  const context = useContext(Context);
  const { customer } = context;

  const bp: TBasketProduct[] = customer.getBasket();

  return (
    <div className={cls.basketList}>
      {bp.map((basketProduct) => (
        <BasketItem
          basketProduct={basketProduct}
          key={`${basketProduct.bProductId} +
            ${basketProduct.bProductColorId} +
            ${basketProduct.bProductSizeId}`}
        />
      ))}
    </div>
  );
});

export default BasketList;
