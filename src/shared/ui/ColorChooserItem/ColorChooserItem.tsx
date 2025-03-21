import React, { FC } from "react";
import cls from "./ColorChooserItem.module.scss";
import { TColor } from "shared/types/types";

type TColorChppserItemProps = {
  color: TColor;
  currentColor: TColor | null;
  chooseColor: (id: number) => void;
};

// Условия рендера компонента по currentColor
// Компонент отрисовываем всегда, проверку что currentColor не null перенес

// убрал colorMap, добавил hex в api
// можно, конечно, было выводить color.name

const ColorChooserItem: FC<TColorChppserItemProps> = ({
  color,
  currentColor,
  chooseColor,
}) => {
  return (
    <div
      className={`${cls.colorItem}  ${
        currentColor && color.name === currentColor.name ? cls.choosenColor : ""
      }`}
      style={{ backgroundColor: color.colorHex }}
      onClick={() => {
        chooseColor(color.id);
      }}
    ></div>
  );
};

export default ColorChooserItem;
