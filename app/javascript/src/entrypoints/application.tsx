import React from "react";
import ReactDOM from "react-dom/client";

import App2 from "../App2";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const root = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement
    );

    root.render(<App2 />);
  },
  false
);
