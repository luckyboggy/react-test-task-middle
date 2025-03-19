import { Main } from "pages/Main";
import { Product } from "pages/Product";
import { Basket } from "pages/Basket";
import { NoPage } from "pages/NoPage";
import { TRoute } from "./types";

const routes: TRoute[] = [
  {
    path: "basket",
    Element: Basket,
  },
  {
    path: "",
    Element: Main,
  },
  {
    path: "product/:id",
    Element: Product,
  },
  {
    path: "*",
    Element: NoPage,
  },
];

export { routes };
