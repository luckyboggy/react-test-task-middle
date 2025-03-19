import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { TProduct } from "shared/types/types";
import cls from "./ProductItem.module.scss";

type TProductItemProps = {
  product: TProduct;
};

const ProductItem: FC<TProductItemProps> = ({ product }) => {
  const { id, name, colors } = product;
  const images = colors[0].images;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`../product/${id}`);
  };

  return (
    <div className={cls.productItem}>
      <div className={cls.wrapper} onClick={(event) => handleClick()}>
        <div className={cls.image}>
          <img src={images[0]} alt="" />
        </div>
        <div className={cls.description}>
          <div className={cls.title}>{name}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
