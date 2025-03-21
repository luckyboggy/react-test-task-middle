import { TBasketProduct, TColor, TProduct, TSize } from "shared/types/types";

const sizes: TSize[] = [
  { id: 1, label: "XS", number: 44 },
  { id: 2, label: "S", number: 46 },
  { id: 3, label: "M", number: 48 },
  { id: 4, label: "L", number: 50 },
  { id: 5, label: "XL", number: 52 },
];

const products: TProduct[] = [
  {
    id: 1,
    name: "Футболка",
    colors: [
      {
        id: 1,
        name: "черный",
        colorHex: "#000000",
        images: ["/images/1/black_front.png", "/images/1/black_back.png"],
        price: "123.00",
        description: 'Описание для "Футболка черный"',
        sizes: [1, 2, 3],
      },
      {
        id: 2,
        name: "белый",
        colorHex: "#FFFFFF",
        images: ["/images/1/white_front.png", "/images/1/white_back.png"],
        price: "125.00",
        description: 'Описание для "Футболка белый"',
        sizes: [1, 2, 3, 4, 5],
      },
      {
        id: 3,
        name: "серый",
        colorHex: "#808080",
        images: ["/images/1/gray_front.png", "/images/1/gray_back.png"],
        price: "120.00",
        description: 'Описание для "Футболка серый"',
        sizes: [],
      },
    ],
  },

  {
    id: 2,
    name: "Майка",
    colors: [
      {
        id: 1,
        name: "желтый",
        colorHex: "#FFFF00",
        images: ["/images/2/yellow_front.png", "/images/2/yellow_back.png"],
        price: "88.00",
        description: 'Описание для "Майка желтый"',
        sizes: [1, 2, 3, 4, 5],
      },
      {
        id: 2,
        name: "синий",
        colorHex: "#0000FF",
        images: ["/images/2/blue_front.png", "/images/2/blue_back.png"],
        price: "89.00",
        description: 'Описание для "Майка синий"',
        sizes: [2],
      },
      {
        id: 3,
        name: "черный",
        colorHex: "#000000",
        images: ["/images/2/black_front.png", "/images/2/black_back.png"],
        price: "90.00",
        description: 'Описание для "Майка черный"',
        sizes: [],
      },
    ],
  },
];

const timeOut: number = 250;

function getSizes(): Promise<TSize[]> {
  console.log("getSizes");

  return new Promise((resolve) => {
    setTimeout(() => resolve(sizes), timeOut);
  });
}

function getSize(id: number): Promise<TSize> {
  console.log("getSize");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const size = sizes.find((size) => size.id === id);
      if (size) {
        resolve(size);
      } else {
        reject(new Error("getSize: Size not found"));
      }
    }, timeOut);
  });
}

// function getProducts(): Promise<TProduct[]> {
//   console.log('getProducts')
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(products), timeOut);
//   });
// }

// Получаем только продукты id которых есть в корзине
function getProducts(
  necessaryProducts: TBasketProduct[] = []
): Promise<TProduct[]> {
  console.log("getProducts");

  // если нет аргументов - возвращаем все товары
  if (necessaryProducts.length === 0) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(products), timeOut);
    });
  }

  const necessaryIds = necessaryProducts.map((bp) => bp.bProductId);

  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = products.filter((product) =>
        necessaryIds.includes(product.id)
      );
      resolve(filteredProducts);
    }, timeOut);
  });
}

function getProduct(id: number): Promise<TProduct> {
  console.log("getProduct");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((product) => product.id === id);
      if (product) {
        resolve(product);
      } else {
        reject(new Error("getProduct: Product not found"));
      }
    }, timeOut);
  });
}

function getProductColor(productID: number, colorID: number): Promise<TColor> {
  console.log("getProductColor");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((product) => product.id === productID);

      if (!product) {
        return reject(new Error("getProductColor: Product not found"));
      }

      const color = product.colors.find((color) => color.id === colorID);

      if (color) {
        resolve(color);
      } else {
        reject(new Error("getProductColor: Color not found"));
      }
    }, timeOut);
  });
}


export { getSizes, getSize, getProducts, getProduct, getProductColor };
