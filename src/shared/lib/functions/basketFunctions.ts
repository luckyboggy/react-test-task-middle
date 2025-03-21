import { customer } from "index";
import { TBasketProduct, TProduct } from "shared/types/types";

// Добавление в корзину + отправка корзины в localStorage
const handleAddToBasket = (basketProduct: TBasketProduct): void => {
  customer.addToBasket(basketProduct);
};

// Удаление корзины + обновление корзины в localStorage
const handleDeleteFromBasket = (basketProduct: TBasketProduct): void => {
  customer.deleteFromBasket(basketProduct);
};

// расчет суммы товаров

// Сума расчитывается без дополнительных запросов к api
const totalPriceCalc = (products: TProduct[]) => {
  let total: number = 0;

  const basketProducts = customer.getBasket();

  basketProducts.forEach((basketProduct) => {
    const product = products.find((p) => p.id === basketProduct.bProductId);

    if (product) {
      const productColor = product.colors.find(
        (color) => color.id === basketProduct.bProductColorId
      );
      if (productColor) {
        total += Number(productColor.price);
      }
    }
  });

  return total;
};

export { handleAddToBasket, handleDeleteFromBasket, totalPriceCalc };
