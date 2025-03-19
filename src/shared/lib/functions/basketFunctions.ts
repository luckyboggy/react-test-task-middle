import { customer } from "index";
import { getProductColor } from "services/api";
import { TBasketProduct } from "shared/types/types";

// Добавление в корзину + отправка корзины в localStorage
const handleAddToBasket = (basketProduct: TBasketProduct): void => {
  customer.addToBasket(basketProduct);
  window.localStorage.setItem(
    "localBasket",
    JSON.stringify(customer.getBasket())
  );
};

// Удаление корзины + обновление корзины в localStorage
const handleDeleteFromBasket = (basketProduct: TBasketProduct): void => {
  customer.deleteFromBasket(basketProduct);
  window.localStorage.setItem(
    "localBasket",
    JSON.stringify(customer.getBasket())
  );
};

// расчет суммы товаров
const totalPriceCalc = async (): Promise<number> => {
  let total: number = 0;
  let productData = [];
  productData = await Promise.all(
    customer
      .getBasket()
      .map((bp) => getProductColor(bp.bProductId, bp.bProductColorId))
  );

  productData.forEach((data) => {
    total += Number(data.price);
  });
  return total;
};

export { handleAddToBasket, handleDeleteFromBasket, totalPriceCalc };
