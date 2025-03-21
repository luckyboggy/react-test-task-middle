import React, { FC, useState } from "react";
import cls from "./Carousel.module.scss";

type TCarouselProps = {
  images: string[];
};

const Carousel: FC<TCarouselProps> = ({ images }) => {
  const [currentImg, setCurrentImg] = useState<number>(0);

  // Предполагаю что проблема в использовании состояния напрямую в функции обновления

  const plusIndex = (n: number): void => {
    setCurrentImg((prevImg: number) => {
      if (prevImg + n < 0) {
        return images.length - 1;
      } else if (prevImg + n > images.length - 1) {
        return 0;
      } else {
        return prevImg + n;
      }
    });
  };

  // Обработка пустого массива
  // По хорошему сюда нужно какую нибудь заглушку, но раз непосредственно верстку мы
  // мало обсуждаем, позволю себе опустить этот момент

  if (images.length === 0) {
    return <div className={cls.carousel}>no images</div>;
  }

  return (
    <div className={cls.carousel}>
      <img src={images[currentImg]} alt="#" />
      <div className={cls.btn}>
        <div className={cls.prev} onClick={() => plusIndex(-1)}>
          {"<"}
        </div>
        <div className={cls.next} onClick={() => plusIndex(1)}>
          {">"}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
