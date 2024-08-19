import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { App } from "./Components/App";
import { DogProvider } from "./Context/DogContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DogProvider>
      <Toaster />
      <App />
    </DogProvider>
  </React.StrictMode>,
);
