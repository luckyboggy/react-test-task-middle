import React, { FC, useEffect, useState } from "react";
import { TBasketProduct, TColor, TProduct, TSize } from "shared/types/types";
import { handleDeleteFromBasket } from "shared/lib/functions/basketFunctions";
import cls from "./BasketItem.module.scss";

type TBasketItemProps = {
  basketProduct: TBasketProduct;
  products: TProduct[];
  sizes: TSize[];
};

const BasketItem: FC<TBasketItemProps> = ({
  basketProduct,
  products,
  sizes,
}) => {
  const { bProductId, bProductColorId, bProductSizeId } = basketProduct;

  const [loading, setLoading] = useState<boolean>(true);

  const [bProduct, setBProduct] = useState<TProduct>();
  const [bProductColor, setBProductColor] = useState<TColor>();
  const [bProductSize, setBProductSize] = useState<TSize>();

  useEffect(() => {
    const p = products.find((p) => p.id === bProductId);
    if (p) {
      setBProduct(p);

      const c = p.colors.find((color) => color.id === bProductColorId);
      if (c) {
        setBProductColor(c);

        const s = sizes.find((size) => size.id === bProductSizeId);
        if (s) {
          setBProductSize(s);
        }
      }
    }
    setLoading(false);
  }, [bProductColorId, bProductId, bProductSizeId, products, sizes]);

  if (loading) {
    return <div className={cls.basketItem}>Loading...</div>;
  }

  return (
    <div className={cls.basketItem}>
      <div className={cls.wrapper}>
        <div className={cls.image}>
          {bProductColor && <img src={bProductColor.images[0]} alt="" />}
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
