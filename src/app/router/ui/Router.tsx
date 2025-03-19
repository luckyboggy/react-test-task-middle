import React from "react";
import { routes } from "../routes";
import { Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <div className="container">
      <Routes>
        {routes.map(({ path, Element }) => (
          <Route path={path} element={<Element />} key={path} />
        ))}
      </Routes>
    </div>
  );
}
