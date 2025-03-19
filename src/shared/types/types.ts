export type TSize = {
  id: number;
  label: string;
  number: number;
};

export type TColor = {
  id: number;
  name: string;
  images: string[];
  price: string;
  description: string;
  sizes: number[];
};

export type TProduct = {
  id: number;
  name: string;
  colors: TColor[];
};

export type TBasketProduct = {
  bProductId: number;
  bProductColorId: number;
  bProductSizeId: number;
};



