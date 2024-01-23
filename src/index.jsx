import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./configs/apis";
import "./configs/translation";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
    packages used:
        npm install @emotion/cache @emotion/react @emotion/styled @mui/icons-material @mui/lab @mui/material react-router-dom stylis stylis-plugin-rtl@2.0.2 react-multi-carousel react-icons @mui/x-data-grid

    package.json:
        scrips.start = "set \"FAST_REFRESH=false\" && react-scripts start";

*/
