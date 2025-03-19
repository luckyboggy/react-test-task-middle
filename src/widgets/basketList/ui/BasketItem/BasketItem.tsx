import React, { FC, useEffect, useState } from "react";
import { TBasketProduct, TColor, TProduct, TSize } from "shared/types/types";
import { getProduct, getProductColor, getSize } from "services/api";
import { handleDeleteFromBasket } from "shared/lib/functions/basketFunctions";
import cls from "./BasketItem.module.scss";

type TBasketItemProps = {
  basketProduct: TBasketProduct;
};

const BasketItem: FC<TBasketItemProps> = ({ basketProduct }) => {
  const { bProductId, bProductColorId, bProductSizeId } = basketProduct;

  const [loading, setLoading] = useState<boolean>(true);

  const [bProduct, setBProduct] = useState<TProduct>();
  const [bProductColor, setBProductColor] = useState<TColor>();
  const [bProductSize, setBProductSize] = useState<TSize>();

  useEffect(() => {
    getProduct(bProductId)
      .then((data) => {
        setBProduct(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .then(() => {
        getProductColor(bProductId, bProductColorId).then((data) => {
          setBProductColor(data);
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .then(() => {
        getSize(bProductSizeId).then((data) => {
          setBProductSize(data);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bProductId, bProductColorId, bProductSizeId]);

  if (loading) {
    return <div className={cls.basketItem}>Loading...</div>;
  }

  return (
    <div className={cls.basketItem}>
      <div className={cls.wrapper}>
        <div className={cls.image}>
          <img src={bProductColor && bProductColor.images[0]} alt="" />
        </div>
        {bProduct && bProductColor && bProductSize && (
          <div className={cls.info}>
            <div className={cls.title}>{bProduct.name}</div>
            <div className={cls.color}>Цвет: {bProductColor.name}</div>
            <div className={cls.size}>
              Размер: {bProductSize.label} ({bProductSize.number})
            </div>
            <div className={cls.price}>Цена: {bProductColor.price}</div>
          </div>
        )}

        <div className={cls.btn}>
          <div
            className={cls.deleteBtn}
            onClick={(event) => {
              event.preventDefault();
              handleDeleteFromBasket(basketProduct);
            }}
          >
            Удалить
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
