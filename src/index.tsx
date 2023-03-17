import React from "react";
import ReactDOM from "react-dom/client";
import CarList from "./Components/CarList";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <CarList />
  </React.StrictMode>
);
