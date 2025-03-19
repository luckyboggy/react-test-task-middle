import React, { FC } from "react";
import cls from "./AddToBasketBtn.module.scss";
import { isInBasket } from "shared/lib/functions/productFunctions";
import { TBasketProduct, TColor } from "shared/types/types";
import { handleAddToBasket } from "shared/lib/functions/basketFunctions";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

type TAddToBasketProps = {
  sizeId: number;
  colorId: number;
  color: TColor | null;
  productId: number;
};

const AddToBasketBtn: FC<TAddToBasketProps> = observer(
  ({ sizeId, colorId, productId }) => {
    const newBasketProduct: TBasketProduct = {
      bProductId: productId,
      bProductColorId: colorId,
      bProductSizeId: sizeId,
    };

    if (isInBasket(newBasketProduct)) {
      return (
        <button className={`${cls.basketBtn} ${cls.toBasket}`}>
          <Link to="../basket" className={cls.link}>
            в корзину
          </Link>
        </button>
      );
    }
    
    return (
      <button
        className={cls.basketBtn}
        onClick={() => {
          if (sizeId !== null) {
            handleAddToBasket(newBasketProduct);
          }
        }}
      >
        Добавить
      </button>
    );
  }
);

export default AddToBasketBtn;
