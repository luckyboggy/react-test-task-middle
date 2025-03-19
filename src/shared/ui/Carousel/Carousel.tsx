import React, { FC, useState } from "react";
import cls from "./Carousel.module.scss";

type TCarouselProps = {
  images: string[];
};

const Carousel: FC<TCarouselProps> = ({ images }) => {
  const [currentImg, setCurrentImg] = useState(0);

  const plusIndex = (n: number): void => {
    if (currentImg + n < 0) {
      setCurrentImg(images.length - 1);
    } else if (currentImg + n > images.length - 1) {
      setCurrentImg(0);
    } else {
      setCurrentImg(currentImg + n);
    }
  };

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
