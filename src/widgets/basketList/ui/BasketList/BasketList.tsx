import React, { FC } from "react";
import BasketItem from "../BasketItem/BasketItem";
import { TBasketProduct, TProduct, TSize } from "shared/types/types";
import { observer } from "mobx-react-lite";
import cls from "./BasketList.module.scss";

type TBasketListProps = {
  basket: TBasketProduct[];
  products: TProduct[];
  sizes: TSize[];
};

const BasketList: FC<TBasketListProps> = observer(
  ({ basket, products, sizes }) => {
    return (
      <div className={cls.basketList}>
        {basket.map((basketProduct) => (
          <BasketItem
            basketProduct={basketProduct}
            products={products}
            sizes={sizes}
            key={`${basketProduct.bProductId}_${basketProduct.bProductColorId}_${basketProduct.bProductSizeId}`}
          />
        ))}
      </div>
    );
  }
);

export default BasketList;
