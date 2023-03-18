import React from "react";
import ReactDOM from "react-dom/client";
import CarList from "./Components/CarList";
import Modal from "react-modal";
import ListProvider from "./context/ListContext";

Modal.setAppElement("#root");
const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ListProvider>
      <CarList />
    </ListProvider>
  </React.StrictMode>
);
