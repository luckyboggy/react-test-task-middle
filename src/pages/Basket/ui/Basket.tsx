import React, { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "index";
import { observer } from "mobx-react-lite";
import { BasketList } from "widgets/basketList";
import { totalPriceCalc } from "shared/lib/functions/basketFunctions";
import cls from "./Basket.module.scss";
import { TProduct, TSize } from "shared/types/types";
import { getProducts, getSizes } from "services/api";

const Basket: FC = observer(() => {
  const context = useContext(Context);
  const { customer } = context;

  const [loading, setLoading] = useState<boolean>(true);

  const [products, setProducts] = useState<TProduct[]>([]);
  const [sizes, setSizes] = useState<TSize[]>([]);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const basket = customer.getBasket();


  // В целом, при текущей логике, можно убрать basket из массива зависимостей
  // Решил оставить потому что на интерфейс при удалении товара из корзины не влияет и расчёте стоимости 
  useEffect(() => {
    if (basket.length > 0) {
      Promise.all([getProducts(basket), getSizes()])
        .then(([productsData, sizesData]) => {
          setProducts(productsData);
          setSizes(sizesData);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [basket]);

  useEffect(() => {
    if (products.length > 0 && basket.length > 0) {
      setTotalPrice(totalPriceCalc(products));
    }
  }, [products, basket]);

  if (basket.length === 0)
    return (
      <div className={cls.emptyBasket}>
        <div className={cls.title}>Корзина пуста</div>
        <Link to="/" className={cls.link}>
          {"в магазин >"}
        </Link>
      </div>
    );

  if (loading) return <div className={cls.basket}>Loading...</div>;

  return (
    <div className={cls.basket}>
      <div className={cls.title}>Корзина</div>
      <hr />
      <BasketList basket={basket} products={products} sizes={sizes} />
      <hr />
      {totalPrice && <div className={cls.totalPrice}>Сумма: {totalPrice}</div>}

      <div className={cls.btn}>
        <button className={cls.orderBtn}>Оформить</button>
      </div>
    </div>
  );
});

export default Basket;
