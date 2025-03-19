import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TProduct, TColor, TSize } from "shared/types/types";
import { getProduct, getProductColor, getSizes } from "services/api";
import Carousel from "shared/ui/Carousel/Carousel";
import ColorChooserItem from "shared/ui/ColorChooserItem/ColorChooserItem";
import SizeChooserItem from "shared/ui/SizeChooserItem/SizeChooserItem";
import AddToBasketBtn from "shared/ui/Buttons/AddToBasketBtn/AddToBasketBtn";
import { noSizes } from "shared/lib/functions/productFunctions";
import cls from "./Product.module.scss";

const Product: FC = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(true);

  const [product, setProduct] = useState<TProduct>();
  const [currentColorId, setCurrentColorId] = useState<number>(1);
  const [currentColor, setCurrentColor] = useState<TColor | null>(null);
  const [sizes, setSizes] = useState<TSize[]>([]);
  const [currentSizeId, setCurrentSizeId] = useState<number>(0);

  useEffect(() => {
    getProduct(Number(id))
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    getProductColor(Number(id), currentColorId)
      .then((data) => {
        setCurrentColor(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentColorId, id]);

  useEffect(() => {
    getSizes().then((data) => setSizes(data));
  }, [id]);

  if (loading) return <div className={cls.product}>Loading...</div>;
  if (!product) return <div className={cls.product}>Продукт не найден</div>;

  return (
    <div className={cls.product}>
      <div className={cls.wrapper}>
        <div className={cls.image}>
          {currentColor && <Carousel images={currentColor.images} />}
        </div>
        <div className={cls.info}>
          <div className={cls.title}>{product.name}</div>
          {currentColor && (
            <>
              <div className={cls.description}>{currentColor.description}</div>
              <div className={cls.price}>Цена: {currentColor.price}</div>
            </>
          )}
          <div className={cls.heading}>Выбрать цвет</div>
          <div className={cls.colorChooser}>
            {product.colors.map((color) => (
              <ColorChooserItem
                key={color.id}
                color={color}
                currentColor={currentColor}
                chooseColor={setCurrentColorId}
              />
            ))}
          </div>

          <div className={cls.heading}> Выбрать размер</div>
          <div className={cls.sizeChooser}>
            {sizes &&
              sizes.map((size) => (
                <SizeChooserItem
                  key={size.id}
                  size={size}
                  color={currentColor}
                  sizeId={currentSizeId}
                  chooseSize={setCurrentSizeId}
                />
              ))}
          </div>
          <div className={cls.btn}>
            {noSizes(currentColor) ? (
              <div>Товар отсутствует</div>
            ) : currentSizeId === 0 ? (
              <div>Выберите размер</div>
            ) : (
              <AddToBasketBtn
                color={currentColor}
                colorId={currentColorId}
                sizeId={currentSizeId}
                productId={Number(id)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
