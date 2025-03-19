import React, { FC } from "react";
import { ProductList } from "widgets/productList";
import cls from "./Main.module.scss";

const Main: FC = () => {
  return (
    <div className={cls.mainPage}>
      <ProductList />
    </div>
  );
};

export default Main;
