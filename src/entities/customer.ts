import { TBasketProduct } from "shared/types/types";
import { makeAutoObservable } from "mobx";

export class Customer {
  private _basket: TBasketProduct[];

  constructor() {
    this._basket = [];
    this.parseLocalBasket();
    makeAutoObservable(this);
  }

  // скачать корзину с localStorage
  private parseLocalBasket(): void {
    const localBasket = localStorage.getItem("localBasket");
    if (localBasket) {
      this._basket = JSON.parse(localBasket);
    }
  }

  // загрузка корзины в localStorage
  private loadToLocalBasket(): void {
    window.localStorage.setItem("localBasket", JSON.stringify(this._basket));
  }

  // добавить товар в корзину
  addToBasket(basketProduct: TBasketProduct): void {
    this._basket.push(basketProduct);
    this.loadToLocalBasket();
  }

  // удалить товар из корзины
  deleteFromBasket(basketProduct: TBasketProduct): void {
    this._basket = [
      ...this._basket.filter(
        (product) =>
          product.bProductId !== basketProduct.bProductId ||
          product.bProductColorId !== basketProduct.bProductColorId ||
          product.bProductSizeId !== basketProduct.bProductSizeId
      ),
    ];
    this.loadToLocalBasket();
  }

  // получить все товары
  getBasket(): TBasketProduct[] {
    return this._basket;
  }
}
