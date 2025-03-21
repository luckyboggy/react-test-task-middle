import React from "react";
import { Header, Footer } from "widgets/layouts";
import { Router } from "./router";


export default function App() {
  return (
    <div className="App">
      <Header />
      <Router />
      <Footer />
    </div>
  );
}
