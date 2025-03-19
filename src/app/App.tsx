import React, { useEffect } from "react";
import { Header, Footer } from "widgets/layouts";
import { Router } from "./router";
import { customer } from "index";

export default function App() {
  useEffect(() => {
    const basket = localStorage.getItem("localBasket");
    if (basket) {
      customer.parseLocalBasket(JSON.parse(basket));
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Router />
      <Footer />
    </div>
  );
}
