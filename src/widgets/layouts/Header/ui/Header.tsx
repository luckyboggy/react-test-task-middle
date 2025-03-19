import React, { FC, useContext } from "react";
import cls from "./Header.module.scss";
import { Link } from "react-router-dom";
import { Context } from "index";
import { observer } from "mobx-react-lite";

const Header: FC = observer(() => {
  const context = useContext(Context);
  const { customer } = context;
  const basketCounter = customer.getBasket().length;

  return (
    <header className={cls.header}>
      <div className={cls.wrapper}>
        <div className={cls.navigation}>
          <Link to="" className={cls.link}>
            Главная
          </Link>

          <Link to="basket" className={cls.link}>
            Корзина
            {basketCounter > 0 && (
            <div className={cls.count}>{basketCounter}</div>
          )}
          </Link>


        </div>
      </div>
    </header>
  );
});

export default Header;
