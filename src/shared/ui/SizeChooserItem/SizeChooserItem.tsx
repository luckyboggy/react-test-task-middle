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
  currentSizeId: number | null;
  chooseSize: (id: number | null) => void;
};

const SizeChooserItem: FC<TSizeChooserItem> = ({
  size,
  color,
  currentSizeId,
  chooseSize,
}) => {
  return (
    <div
      className={`${cls.sizeItem} ${
        isAvailableSize(size.id, color) ? cls.availableSize : ""
      } ${
        isCurrentSize(size.id, currentSizeId) &&
        isAvailableSize(size.id, color)
          ? cls.choosenSize
          : ""
      }`}
      onClick={() => {
        if (isAvailableSize(size.id, color)) {
          if (currentSizeId === size.id) {
            chooseSize(null);
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
