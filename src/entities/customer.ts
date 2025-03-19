import { TBasketProduct } from "shared/types/types";
import { makeAutoObservable } from "mobx";

export class Customer {
  private _localBasket: TBasketProduct[];

  constructor() {
    this._localBasket = [];
    makeAutoObservable(this);
  }

  // добавить товар в корзину
  addToBasket(basketProduct: TBasketProduct): void {
    this._localBasket.push(basketProduct);
  }

  // удалить товар из корзины
  deleteFromBasket(basketProduct: TBasketProduct): void {
    this._localBasket = [
      ...this._localBasket.filter(
        (product) =>
          product.bProductId !== basketProduct.bProductId ||
          product.bProductColorId !== basketProduct.bProductColorId ||
          product.bProductSizeId !== basketProduct.bProductSizeId
      ),
    ];
  }

  // скачать корзину с localStorage
  parseLocalBasket(localBasket: TBasketProduct[]): void {
    this._localBasket = localBasket;
  }

  // получить все товары
  getBasket(): TBasketProduct[] {
    return this._localBasket;
  }
}
