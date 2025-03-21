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
  const [currentColor, setCurrentColor] = useState<TColor | null>(null);
  const [sizes, setSizes] = useState<TSize[]>([]);

  // Значения по умолчанию не задаются
  const [currentColorId, setCurrentColorId] = useState<number | null>(null);
  const [currentSizeId, setCurrentSizeId] = useState<number | null>(null);

  // Объединил в один useEffect
  useEffect(() => {
    setLoading(true);
    Promise.all([getProduct(Number(id)), getSizes()])
      .then(([productData, sizesData]) => {
        setProduct(productData);
        setSizes(sizesData);

        return productData;
      })
      .then((productData) => {
        setCurrentColorId(productData.colors[0].id);
        return getProductColor(Number(id), productData.colors[0].id);
      })
      .then((colorData) => {
        if (colorData) {
          setCurrentColor(colorData);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Измменение цвета происходит без запроса на сервер
  const handleChooseColor = async (newId: number) => {
    if (product) {
      const newColor =
        product.colors.find((color) => color.id === newId) || null;
      if (newColor !== currentColor) {
        setCurrentColorId(newId);
        setCurrentColor(newColor);
      }
    }
  };
  // Но теперь при изменении цвета мы перестали получать актуальную информацию о наличии размеров

  // Можно попробовать это решить путем загрузки данных в фоновом режиме
  // чтобы звпрос на сервер выполнялся параллельно с обновлением интерфейса
  // Но там будут возникать баги, при медленной скорости загрузки и быстром переключении цветов
  // Эту проблему можно было бы решить при помощи AbortController, чтобы все запросы кроме последнего отменялись
  // Для этого нужно было бы редактировать getProductColor() в api

  // Но скорее всего данное задание не подразумевало залезание в подобные дебри

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
                chooseColor={handleChooseColor}
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
                  currentSizeId={currentSizeId}
                  chooseSize={setCurrentSizeId}
                />
              ))}
          </div>
          <div className={cls.btn}>
            {noSizes(currentColor) ? (
              <div>Товар отсутствует</div>
            ) : currentSizeId === null ? (
              <div>Выберите размер</div>
            ) : (
              currentColorId !== null && (
                <AddToBasketBtn
                  color={currentColor}
                  colorId={currentColorId}
                  sizeId={currentSizeId}
                  productId={Number(id)}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
