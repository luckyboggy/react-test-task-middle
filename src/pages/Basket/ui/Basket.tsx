import React, { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "index";
import { observer } from "mobx-react-lite";
import { BasketList } from "widgets/basketList";
import { totalPriceCalc } from "shared/lib/functions/basketFunctions";
import cls from "./Basket.module.scss";

const Basket: FC = observer(() => {
  const context = useContext(Context);
  const { customer } = context;

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const basketLenght = customer.getBasket().length;

  useEffect(() => {
    totalPriceCalc().then((total) => setTotalPrice(total));
  }, [basketLenght]);

  if (basketLenght === 0)
    return (
      <div className={cls.emptyBasket}>
        <div className={cls.title}>Корзина пуста</div>
        <Link to="../" className={cls.link}>
          {"в магазин >"}
        </Link>
      </div>
    );

  return (
    <div className={cls.basket}>
      <div className={cls.title}>Корзина</div>
      <hr />
      <BasketList />
      <hr />
      {totalPrice && <div className={cls.totalPrice}>Сумма: {totalPrice}</div>}

      <div className={cls.btn}>
        <button className={cls.orderBtn}>Оформить</button>
      </div>
    </div>
  );
});

export default Basket;
