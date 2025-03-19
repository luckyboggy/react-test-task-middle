import React, { FC } from "react";
import cls from "./SizeChooserItem.module.scss";
import { TColor, TSize } from "shared/types/types";
import {
  isAvailableSize,
  isCurrentSize,
} from "shared/lib/functions/productFunctions";

type TSizeChooserItem = {
  size: TSize;
  color: TColor | null;
  sizeId: number;
  chooseSize: (id: number) => void;
};

const SizeChooserItem: FC<TSizeChooserItem> = ({
  size,
  color,
  sizeId,
  chooseSize,
}) => {
  return (
    <div
      key={size.id}
      className={`${cls.sizeItem} ${
        isAvailableSize(size.id, color) ? cls.availableSize : ""
      } ${
        isCurrentSize(size.id, sizeId) &&
        isAvailableSize(size.id, color)
          ? cls.choosenSize
          : ""
      }`}
      onClick={() => {
        if (isAvailableSize(size.id, color)) {
          if (sizeId === size.id) {
            chooseSize(0);
          } else {
            chooseSize(size.id);
          }
        }
      }}
    >
      {size.label}
    </div>
  );
};

export default SizeChooserItem;
