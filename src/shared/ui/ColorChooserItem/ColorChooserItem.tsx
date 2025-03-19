import React, { FC } from "react";
import cls from "./ColorChooserItem.module.scss";
import { TColor } from "shared/types/types";

type TColorChppserItemProps = {
  color: TColor;
  currentColor: TColor | null;
  chooseColor: (id: number) => void;
};

const colorMap: { [key: string]: string } = {
  черный: "#000000",
  белый: "#FFFFFF",
  серый: "#808080",
  желтый: "#FFFF00",
  синий: "#0000FF",
};

const ColorChooserItem: FC<TColorChppserItemProps> = ({
  color,
  currentColor,
  chooseColor,
}) => {
  return (
    <div>
      {currentColor && (
        <div
          className={`${cls.colorItem}  ${
            color.name === currentColor.name ? cls.choosenColor : ""
          }`}
          style={{ backgroundColor: colorMap[color.name] }}
          key={color.id}
          onClick={(event) => {
            event.preventDefault();
            chooseColor(color.id);
          }}
        ></div>
      )}
    </div>
  );
};

export default ColorChooserItem;
