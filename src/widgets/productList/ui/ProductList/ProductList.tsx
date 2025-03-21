import React, { FC, useState, useEffect } from "react";
import { getProducts } from "services/api";
import { TProduct } from "shared/types/types";
import cls from "./ProductList.module.scss";
import ProductItem from "../ProductItem/ProductItem";

const ProductList: FC = () => {
  const [products, setProducts] = useState<TProduct[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <div className={cls.productList}>Loading...</div>;

  return (
    <div className={cls.productList}>
      <div className={cls.heading}></div>
      <div className={cls.content}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
