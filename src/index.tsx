import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Customer } from "entities/customer";
import App from "./app/App";

import "./app/styles/index.scss";

type TContext = {
  customer: Customer;
};

const customer = new Customer();
export const Context = createContext<TContext>({ customer });

const rootView = document.getElementById("root");

if (rootView) {
  const root = ReactDOM.createRoot(rootView);
  root.render(
    //<React.StrictMode>
      <Context.Provider value={{ customer }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Context.Provider>
    //</React.StrictMode>
  );
}
export { customer };
