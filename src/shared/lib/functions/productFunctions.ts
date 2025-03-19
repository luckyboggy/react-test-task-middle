import { customer } from "index";
import { TBasketProduct, TColor } from "shared/types/types";

// Проверка доступен ли размер
export const isAvailableSize = (
  sizeId: number,
  color: TColor | null
): boolean => {
  if (color && color.sizes.includes(sizeId)) return true;
  return false;
};

// Проверка выбран ли размер
export const isCurrentSize = (
  sizeId: number,
  currentSizeId: number
): boolean => {
  return currentSizeId === sizeId;
};

// true если размеры данного цвета отсутствуют
export const noSizes = (color: TColor | null): boolean => {
  if (color && color.sizes.length === 0) return true;
  return false;
};

// Проверка есть данный товар (связка товар-цвет-размер) в корзине
export const isInBasket = (basketProduct: TBasketProduct): boolean => {
  const basket = customer.getBasket();

  if (
    basket.some(
      (bp) =>
        bp.bProductId === basketProduct.bProductId &&
        bp.bProductColorId === basketProduct.bProductColorId &&
        bp.bProductSizeId === basketProduct.bProductSizeId
    )
  )
    return true;
  return false;
};


